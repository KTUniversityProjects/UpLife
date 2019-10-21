import db from "../../utils/database";
import { getCurrentTimestamp } from "../../utils/utils";

let Model = function(model) {
  this.id = model.id;
  this.userid = model.userid;
  this.date = getCurrentTimestamp();
  this.access_token = model.access_token;
};

let tableName = "session";

let sessionController = db.createControllerMethods(
  tableName,
  Model,
  ["userid", "date", "access_token"],
  []
);

let sessionInsideController = {};
sessionInsideController.addSession = async function(sessionInfo) {
  let result = null;
  let session = new Model(sessionInfo);
  const query = new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user (access_token, user_id) VALUES (?,?,?)`,
      [session.accessToken, session.user_id],
      (err, rows) => {
        if (err) reject();
        else {
          resolve();
          result = true;
        }
      }
    );
  });
  await query;
  return result;
};

sessionInsideController.removeAccessToken = async function(userID) {
  let doesExist = false;
  const doesSessionExist = new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM session WHERE user_id = ?`,
      [userID],
      (err, rows) => {
        if (err) reject();
        else {
          resolve();
          doesExist = true;
        }
      }
    );
  });
  await doesSessionExist;
  if (doesExist) {
    const deleteQuery = new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM session WHERE user_id = ?`,
        [userID],
        (err, rows) => {
          if (err) reject();
          else resolve();
        }
      );
    });
    await deleteQuery;
  }
  return true;
};

export { sessionController, sessionInsideController };
