require("dotenv").config();
import { Router } from "express";
import { userInsideController } from "../controls/user";
import https from "https";
const FacebookAuthentication = require("@authentication/facebook");
const router = Router();

const facebookAuthentication = new FacebookAuthentication({
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
});

router.post(facebookAuthentication.callbackPath, async (req, res, next) => {
  facebookAuthentication.redirectToProvider(req, res, next);
});

router.get(facebookAuthentication.callbackPath, async (req, res, next) => {
  try {
    if (facebookAuthentication.userCancelledLogin(req)) {
      return res.redirect(process.env.CLIENT_URL);
    }
    const {
      accessToken,
      profile
    } = await facebookAuthentication.completeAuthentication(req, res);
    let username = profile.id;
    const ifExists = await userInsideController.checkIfUserExists(username);
    if (!ifExists)
      await userInsideController.addUser({
        username: username,
        name: profile.name.givenName,
        lastname: profile.name.familyName
      });
    const userId = await userInsideController.getUserID(username);
    res.redirect(
      307,
      `${process.env.CLIENT_URL}/?key=value#token=${accessToken}#userId=${userId}`
    );
  } catch (ex) {
    next(ex);
  }
});

const authentication = {};

authentication.isAuthenticated = (req, res, next) => {
  let getToken;
  if (req.header("authorization"))
    getToken = req.header("authorization").split(" ")[1];
  if (getToken) {
    https
      .get("https://graph.facebook.com/app?access_token=" + getToken, resp => {
        let data = "";
        resp.on("data", chunk => (data += chunk));
        resp.on("end", () => {
          if (data != "") {
            https
              .get(
                "https://graph.facebook.com/me?fields=id&access_token=" +
                  getToken,
                resp => {
                  let data = "";
                  resp.on("data", chunk => (data += chunk));
                  resp.on("end", () => {
                    req.user_id = data;
                    next();
                  });
                }
              )
              .on("error", err => Unaouthorized());
          } else Unaouthorized();
        });
      })
      .on("error", err => {
        Unaouthorized();
      });
  } else Unaouthorized();

  function Unaouthorized() {
    res.status(404);
    res.send("Unaouthorized");
  }
};

authentication.isAdmin = async (req, res, next) => {
  const user = await userInsideController.getUser(JSON.parse(req.user_id).id);
  if (user[0].role_id == 2) next();
  else res.status(404).send("Unauthorized");
};

export { router, authentication };
