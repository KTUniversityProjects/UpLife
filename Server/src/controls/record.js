import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.date = model.date;
  this.check_mark = model.check_mark;
  this.habit_id = model.habit_id;
  this.user_id = model.user_id;
};

let tableName = "record";

export default db.createControllerMethods(
  tableName,
  Model,
  ["date", "check_mark", "habit_id", "user_id"],
  ["date", "check_mark"]
);
