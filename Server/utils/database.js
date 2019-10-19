import mysql from "mysql";
import handleError from "./utils";

const db = mysql.createConnection({
  host: "remotemysql.com",
  user: "ekjA9vCRo2",
  password: "CpTfZ8ck8Y",
  database: "ekjA9vCRo2"
});

db.connection = function() {
  this.connect(err => {
    if (err) {
      throw err;
    }
    console.log("---Connected to database---");
  });
};

db.getAll = tableName => {
  return (req, res) => {
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
};

db.create = (tableName, values, Model) => {
  return (req, res) => {
    let object = new Model(req.body);
    let insertInto = values.join(",");
    values.forEach(function(value, index) {
      this[index] = object[value];
    }, values);
    let placeholders = values.map(val => "?").join(",");
    let query = `INSERT INTO ${tableName} (${insertInto}) VALUES (${placeholders})`;
    db.query(query, values, err => {
      if (err) {
        handleError(err, res);
      } else res.send(`${tableName} inserted successfuly`);
    });
  };
};

db.get = (tableName, Model) => {
  return (req, res) => {
    let id = req.params.id;
    db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
      if (err) {
        handleError(err, res);
      } else {
        let result =
          row === undefined || row.length == 0 ? {} : new Model(row[0]);
        res.send(result);
      }
    });
  };
};

db.update = (tableName, values, Model) => {
  return (req, res) => {
    let object = new Model(req.body);
    let objectValues = [];
    values.forEach(function(value, index) {
      objectValues.push(object[value]);
      this[index] = `${value} = ?`;
    }, values);
    values = values.join(",");
    let query = `UPDATE ${tableName} SET ${values} WHERE id = ${req.params.id}`;

    db.query(query, objectValues, err => {
      if (err) {
        handleError(err, res);
      } else res.send(`${tableName} updated successfuly`);
    });
  };
};

db.remove = tableName => {
  return (req, res) => {
    db.query(`DELETE FROM ${tableName} WHERE id = ${req.params.id}`, err => {
      if (err) {
        handleError(err, res);
      } else res.send(`Record from ${tableName} deleted successfuly`);
    });
  };
};

db.createControllerMethods = (tableName, Model, createValues, updateValues) => {
  const getAll = db.getAll(tableName);
  const create = db.create(tableName, createValues, Model);
  const get = db.get(tableName, Model);
  const update = db.update(tableName, updateValues, Model);
  const remove = db.remove(tableName);
  return { getAll, get, create, update, remove };
};

export default db;
