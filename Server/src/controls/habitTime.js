import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.endtime = model.endtime;
  this.starttime = model.starttime;
};

let tableName = "habit_time";

export default db.createControllerMethods(
  tableName,
  Model,
  ["endtime", "starttime", "habit_id", "routine_id"],
  ["endtime", "starttime", "habit_id", "routine_id"]
);
