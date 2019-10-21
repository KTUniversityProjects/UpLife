import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.date = model.date;
  this.checkmark = model.checkmark;
  this.habit_id = model.habit_id;
};

let tableName = "record";

export default db.createControllerMethods(
  tableName,
  Model,
  ["date", "checkmark", "habit_id"],
  ["date", "checkmark"]
);
