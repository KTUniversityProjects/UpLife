import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "cateory";

const getAll = (req, res) => {
  db.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    if (err) handleError(err, res);
    else {
      let items = [];
      rows.forEach(row => {
        items.push(new Model(row));
      });
      res.send(items);
    }
  });
};

const create = (req, res) => {
  let object = new Model(req.body);
  db.query(
    `INSERT INTO ${tableName} (name,habit_id) VALUES (?,?)`,
    [object.name, object.habit_id],
    err => {
      if (err) {
        handleError(err, res);
      } else res.send("Category inserted successfuly");
    }
  );
};

const get = (req, res) => {
  let id = req.params.id;
  db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
    if (err) {
      handleError(err, res);
    } else {
      let result = new Model(row[0]);
      res.send(result);
    }
  });
};

//UPDATE
const update = (req, res) => {
  let id = req.params.id;
  let object = new Model(req.body);
  db.query(
    `UPDATE ${tableName} SET name = ? WHERE id = ?`,
    [object.name, id],
    err => {
      if (err) {
        handleError(err, res);
      } else res.send("Category updated successfuly");
    }
  );
};

//REMOVE
const remove = (req, res) => {
  let id = req.params.id;
  db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], err => {
    if (err) {
      handleError(err, res);
    } else res.send("Category deleted successfuly");
  });
};

export default { getAll, get, create, update, remove };
