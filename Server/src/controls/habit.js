import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.description = model.description;
  this.name = model.name;
  this.user_id = model.user_id;
};

let tableName = "habit";

export default db.createControllerMethods(
  tableName,
  Model,
  ["description", "name", "user_id"],
  ["description", "name"]
);
