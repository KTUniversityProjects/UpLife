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

export default db.createControllerMethods(
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
