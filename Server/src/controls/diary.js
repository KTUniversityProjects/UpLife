import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.day = model.day;
  this.text = model.text;
  this.user_id = model.user_id;
};

let tableName = "diary";

export default db.createControllerMethods(
  tableName,
  Model,
  ["day", "text", "user_id"],
  ["day", "text"]
);
