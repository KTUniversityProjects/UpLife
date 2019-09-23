import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "record";

const create = (req, res) => {
  res.send("CREATE session. OK.");
};

const get = (req, res) => {
  let id = req.params.id;
  res.send("GET session BY ID. OK. ID: " + id);
};

const update = (req, res) => {
  let id = req.params.id;
  res.send("UPDATE session BY ID. OK. GOT ID " + id);
};

const remove = (req, res) => {
  let id = req.params.id;
  res.send("REMOVE session BY ID. OK. GOT ID " + id);
};

export default { get, create, update, remove };
