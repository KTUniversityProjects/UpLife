require("dotenv").config();
import mysql from "mysql";
import { handleError } from "./utils";
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connection = function() {
  this.connect(err => {
    if (err) throw err;
    console.log("---Connected to database---");
  });
};

const empty = res => {
  res.status(404);
  res.send("The result of the request was empty.");
};

db.getAll = (tableName, Model) => {
  return (req, res) => {
    db.query(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) handleError(err, res);
      else {
        let items = [];
        rows.forEach(row => {
          items.push(new Model(row));
        });
        if (items.length != 0) res.send(items);
        else empty(res);
      }
    });
  };
};

db.create = (tableName, valuesArr, Model) => {
  return (req, res) => {
    const object = new Model(req.body);
    const insertInto = valuesArr.join(",");
    const values = [];
    valuesArr.forEach(function(value, index) {
      this[index] = object[value];
    }, values);
    const placeholders = valuesArr.map(val => "?").join(",");
    const query = `INSERT INTO ${tableName} (${insertInto}) VALUES (${placeholders})`;
    db.query(query, values, (err, rows) => {
      if (err) {
        return handleError(err, res);
      } else {
        if (rows.afftectedRows != 0)
          res.send(`${tableName} inserted successfuly`);
        else empty(res);
      }
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
          row === undefined || row.length == 0 ? [] : new Model(row[0]);
        if (result.length == 0) empty(res);
        else res.send(result);
      }
    });
  };
};

db.update = (tableName, values, Model) => {
  return (req, res) => {
    const id = req.params.id;
    let exit = 0;
    db.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id],
      (err, currentRow) => {
        if (err) {
          handleError(err, res);
        } else {
          let currentModel =
            currentRow === undefined || currentRow.length == 0
              ? {}
              : new Model(currentRow[0]);
          Object.keys(req.body).forEach(key => {
            if (key in currentModel) {
              currentModel[key] = req.body[key];
            } else {
              res.status(404);
              res.send("Tried to update undefined property");
              exit = 1;
            }
          });
          if (exit == 1) {
            return;
          }
          let objectValues = [];
          let setValues = [];
          values.forEach(function(value, index) {
            objectValues.push(currentModel[value]);
            this[index] = `${value} = ?`;
          }, setValues);
          const query = `UPDATE ${tableName} SET ${setValues} WHERE id = ${id}`;
          db.query(query, objectValues, err => {
            if (err) {
              handleError(err, res);
            } else res.send(`${tableName} updated successfuly`);
          });
        }
      }
    );
  };
};

db.remove = tableName => {
  if (tableName === "habit") {
    return (req, res) => {
      db.query(
        `DELETE FROM record WHERE habit_id = ${req.params.id}`,
        (err, rows) => {
          db.query(
            `DELETE FROM ${tableName} WHERE id = ${req.params.id}`,
            (err, rows) => {
              if (err) {
                handleError(err, res);
              } else {
                if (rows.affectedRows != 0)
                  res.send(`Record from ${tableName} deleted successfuly`);
                else empty(res);
              }
            }
          );
        }
      );
    };
  }
  return (req, res) => {
    db.query(
      `DELETE FROM ${tableName} WHERE id = ${req.params.id}`,
      (err, rows) => {
        if (err) {
          handleError(err, res);
        } else {
          if (rows.affectedRows != 0)
            res.send(`Record from ${tableName} deleted successfuly`);
          else empty(res);
        }
      }
    );
  };
};

db.createControllerMethods = (tableName, Model, createValues, updateValues) => {
  const getAll = db.getAll(tableName, Model);
  const create = db.create(tableName, createValues, Model);
  const get = db.get(tableName, Model);
  const update = db.update(tableName, updateValues, Model);
  const remove = db.remove(tableName);
  return { getAll, get, create, update, remove };
};

export default db;
