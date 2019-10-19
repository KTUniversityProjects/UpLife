import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.categoryid = model.categoryid;
  this.description = model.description;
  this.name = model.name;
  this.user_id = model.user_id;
};

let tableName = "habit";

export default db.createControllerMethods(
  tableName,
  Model,
  ["categoryid", "description", "name", "user_id"],
  ["categoryid", "description", "name"]
);
