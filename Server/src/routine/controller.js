import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "routine";

const getAll = (req, res) => {
  res.send("GET ALL ROUTINE. OK.");
};

const create = (req, res) => {
  res.send("CREATE ROUTINE. OK.");
};

//REMOVE
const remove = (req, res) => {
  let id = req.params.id;
  res.send("DELETE ROUTINE BY ID. OK. GOT ID " + id);
};

export default { getAll, create, remove };
