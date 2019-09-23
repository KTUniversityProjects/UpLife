import Model from "./model";
import db from "../../utils/database";
import handleError from "../../utils/utils";

let tableName = "user";

const getAll = (req, res) => {
  db.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    if (err) handleError(err, res);
    else {
      let users = [];
      rows.forEach(row => {
        users.push(new Model(row));
      });
      res.send(users);
    }
  });
};

const create = (req, res) => {
  let user = new Model(req.body);
  db.query(
    `INSERT INTO ${tableName} (email, lastname, name, password, username) VALUES ("${user.email}", "${user.lastname}", "${user.name}", "${user.password}", "${user.username}")`,
    (err, rows) => {
      if (err) {
        handleError(err, res);
      } else res.send("User insert successful");
    }
  );
};

const get = (req, res) => {
  let id = req.params.id;
  db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
    if (err) {
      handleError(err, res);
    } else {
      let user = new Model(row[0]);
      res.send(user);
    }
  });
};

//UPDATE
const update = (req, res) => {
  let id = req.params.id;
  res.send("UPDATE USER. OK. GOT ID " + id);
};

//REMOVE
const remove = (req, res) => {
  let id = req.params.id;
  res.send("DELETE USER. OK. GOT ID " + id);
};

export default { getAll, get, create, update, remove };
