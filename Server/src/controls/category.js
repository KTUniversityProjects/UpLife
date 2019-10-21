import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.name = model.name;
  this.habit_id = model.habit_id;
};

let tableName = "category";

export default db.createControllerMethods(
  tableName,
  Model,
  ["name", "habit_id"],
  ["name"]
);
