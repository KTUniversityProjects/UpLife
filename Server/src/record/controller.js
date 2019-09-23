import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "record";

const getAll = (req, res) => {
  res.send("GET ALL RECORDS. OK.");
};

const create = (req, res) => {
  res.send("CREATE RECORD. OK.");
};

const get = (req, res) => {
  let id = req.params.id;
  res.send("GET RECORD BY ID. OK. ID: " + id);
};

const update = (req, res) => {
  let id = req.params.id;
  res.send("UPDATE RECORD BY ID. OK. GOT ID " + id);
};

const remove = (req, res) => {
  let id = req.params.id;
  res.send("REMOVE RECORD BY ID. OK. GOT ID " + id);
};

export default { getAll, get, create, update, remove };
