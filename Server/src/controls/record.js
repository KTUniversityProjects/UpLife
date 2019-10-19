import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.date = model.date;
  this.check = model.check;
  this.habit_id = model.habit_id;
};

let tableName = "record";

export default db.createControllerMethods(
  tableName,
  Model,
  ["date", "check", "habit_id"],
  ["date", "check"]
);
