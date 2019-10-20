require("dotenv").config();
import { Router } from "express";
import db from "../../utils/database";

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
      refreshToken,
      profile,
      state
    } = await facebookAuthentication.completeAuthentication(req, res);

    let username = profile.name.givenName + profile.name.familyName;

    const ifExists = await db.checkIfUserExists(username);
    let user = null;
    if (ifExists) {
      //TODO:
      user = new UserModel(""); // <--Import user model. Create new with unique username (maybe ID from profile)
      await db.addUser(user); //<-- Do query to add user to DB. Also, retrieve user ID by username
    } else {
      user = await db.getUserID(); //<-- retrieve userID by username.
    }
    const session = new SessionModel(""); //<-- Import session model. Add UserID and accessToken.
    db.addSession(session); //<-- Create addSession. Add session to DB.
    return res.redirect(process.env.CLIENT_URL); //<-- Send accessToken to the client. Client saves it in local/session storage.
  } catch (ex) {
    next(ex);
  }
});

export default router;
