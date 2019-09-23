import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "cateory";

const getAll = (req, res) => {
  res.send("GET ALL CATEGORIES. OK.");
};

const create = (req, res) => {
  res.send("CREATE CATEGORIE. OK.");
};

const get = (req, res) => {
  let id = req.params.id;
  res.send("GET CATEGORY BY ID. OK. ID: " + id);
};

//UPDATE
const update = (req, res) => {
  let id = req.params.id;
  res.send("UPDATE CATEGORY BY ID. OK. ID: " + id);
};

//REMOVE
const remove = (req, res) => {
  let id = req.params.id;
  res.send("DELETE CATEGORY BY ID. OK. GOT ID " + id);
};

export default { getAll, get, create, update, remove };
