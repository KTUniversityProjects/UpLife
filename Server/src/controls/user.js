import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.username = model.modelname;
  this.name = model.name;
  this.lastname = model.lastname;
  this.email = model.email;
  this.score = model.score;
  this.password = model.password;
};

let tableName = "user";

export default db.createControllerMethods(
  tableName,
  Model,
  ["email", "lastname", "name", "password", "username"],
  ["email", "lastname", "name", "password", "username"]
);
