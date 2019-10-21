require("dotenv").config();
import { Router } from "express";
import { userInsideController } from "../controls/user";
import { sessionInsideController } from "../controls/session";
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

    let username = profile.name.givenName + profile.name.familyName;

    const ifExists = await userInsideController.checkIfUserExists(username);
    if (!ifExists)
      await userInsideController.addUser({
        username: profile.id,
        name: profile.name.givenName,
        lastname: profile.name.familyName
      });
    let userID = await userInsideController.getUserID(username);
    await sessionInsideController.removeAccessToken(userID);
    sessionInsideController.addSession({
      access_token: accessToken,
      user_id: userID
    });
    res.redirect(
      307,
      `${process.env.CLIENT_URL}/?key=value#token=${accessToken}`
    );
  } catch (ex) {
    next(ex);
  }
});

export default router;
