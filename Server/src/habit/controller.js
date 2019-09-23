import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "routine";

const getAll = (req, res) => {
  res.send("GET ALL HABITS. OK.");
};

const create = (req, res) => {
  res.send("CREATE HABIT. OK.");
};

const get = (req, res) => {
  let id = req.params.id;
  res.send("GET HABIT BY ID. OK. ID: " + id);
};

const remove = (req, res) => {
  let id = req.params.id;
  res.send("REMOVE HABIT BY ID. OK. GOT ID " + id);
};

export default { getAll, get, create, remove };
