import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.categoryId = model.categoryId;
  this.description = model.description;
  this.name = model.name;
};

let tableName = "habit";

export default db.createControllerMethods(
  tableName,
  Model,
  ["categoryid", "description", "name", "user_id"],
  ["categoryid", "description", "name"]
);
