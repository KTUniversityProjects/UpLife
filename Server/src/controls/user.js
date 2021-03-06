import db from "../../utils/database";
import { getCurrentTimestamp } from "../../utils/utils";
let Model = function(model) {
  this.id = model.id;
  this.username = model.username;
  this.name = model.name;
  this.lastname = model.lastname;
  this.email = model.email;
  this.score = model.score;
  this.password = model.password;
  this.created_at = getCurrentTimestamp();
  this.updated_at = getCurrentTimestamp();
};

let tableName = "user";

let userController = db.createControllerMethods(
  tableName,
  Model,
  [
    "email",
    "lastname",
    "name",
    "password",
    "username",
    "created_at",
    "updated_at"
  ],
  ["email", "lastname", "name", "password", "username", "updated_at"]
);

let userInsideController = {};

userInsideController.checkIfUserExists = async function(username) {
  let result = null;
  const query = new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user WHERE username = ?`,
      [username],
      (err, rows) => {
        if (err) reject();
        else {
          result = rows.length > 0 ? true : false;
          resolve();
        }
      }
    );
  });
  await query;
  return result;
};

userInsideController.addUser = async function(userInfo) {
  let result = null;
  let user = new Model(userInfo);
  const query = new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user (created_at, updated_at, username, name, lastname) VALUES (?,?,?,?,?)`,
      [
        user.created_at,
        user.updated_at,
        user.username,
        user.name,
        user.lastname
      ],
      (err, rows) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve();
          result = true;
        }
      }
    );
  });
  // const roleQuery = new Promise((resolve, reject) => {
  //   db.query(
  //     `INSERT INTO user_roles (user_id, role_id) VALUES ('1', '1');`,
  //     [
  //       user.created_at,
  //       user.updated_at,
  //       user.username,
  //       user.name,
  //       user.lastname
  //     ],
  //     (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //         reject();
  //       } else {
  //         console.log("Add user", rows);
  //         resolve();
  //         result = true;
  //       }
  //     }
  //   );
  // });
  await query;
  //await roleQuery;
  return result;
};

userInsideController.getUserID = async function(username) {
  let result = null;
  const query = new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user WHERE username = ?`,
      [username],
      (err, rows) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve();
          result = rows[0].id;
        }
      }
    );
  });
  await query;
  return result;
};

userInsideController.getUser = async function(username) {
  let result = null;
  const query = new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user LEFT JOIN user_roles ON user.id = user_roles.user_id WHERE username = ?`,
      [username],
      (err, rows) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve();
          result = rows;
        }
      }
    );
  });
  await query;
  return result;
};

export { userController, userInsideController };
