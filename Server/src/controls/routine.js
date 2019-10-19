import db from "../../utils/database";

let Model = function(model) {
  this.id = model.id;
  this.day = model.day;
};

let tableName = "routine";

export default db.createControllerMethods(tableName, Model, ["day"], ["day"]);
