import Model from "./model";
import db from "../../utils/database";
let tableName = "user";
const getAll = (req, res) => {
  console.log(this);
  db.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    if (err) throw err;
    let Objects = [];
    rows.forEach(row => {
      Objects.push(new Model(row));
    });
    Objects.forEach(user => console.log(user));
  });
};

//CREATE NEW
const create = (req, res) => {
  console.log(req.body, res.body);
  db.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    if (err) throw err;
    console.log("data from db: ", rows);
  });
};

//GET ONE BY ID
const get = (req, res) => {
  console.log(req, res);
  db.query(`SELECT * FROM ${tableName}`, (err, row) => {
    let Item = new Model(row);
    console.log(Item); //One user
  });
};

//UPDATE
const update = (req, res) => {
  db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, rows) => {
    if (err) throw err;
    console.log("data from db: ", rows);
  });
};
//REMOVE
const remove = (req, res) => {
  db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, rows) => {
    if (err) throw err;
    console.log("data from db: ", rows);
  });
};

export default { getAll, get, create, update, remove };
