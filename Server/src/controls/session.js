import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.userid = model.userid;
  this.date = model.date;
};

let tableName = "session";

export default db.createControllerMethods(
  tableName,
  Model,
  ["userid", "date"],
  []
);
