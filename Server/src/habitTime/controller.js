import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "cateory";

const getAll = (req, res) => {
  res.send("GET ALL HABIT TIMES. OK.");
};

const create = (req, res) => {
  res.send("CREATE HABIT TIME. OK.");
};

const get = (req, res) => {
  let id = req.params.id;
  res.send("GET HABIT TIME BY ID. OK. ID: " + id);
};

//UPDATE
const update = (req, res) => {
  let id = req.params.id;
  res.send("UPDATE HABIT TIME BY ID. OK. ID: " + id);
};

//REMOVE
const remove = (req, res) => {
  let id = req.params.id;
  res.send("DELETE HABIT TIME BY ID. OK. GOT ID " + id);
};

export default { getAll, get, create, update, remove };
