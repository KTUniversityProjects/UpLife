import Model from "./model";
import db from "../../utils/database";

//EXAMPPLE QUERY TO GET ALL. MAKE GLOBAL CONTROLLER AND USER IT IN ALL SUBSCONTROLLERS.
const get = tableName => {
  db.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    if (err) throw err;
    let Users = [];
    rows.forEach(row => {
      Users.push(new Model(row));
    });
    Users.forEach(user => console.log(user));
  });
};

const create = () => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    console.log("data from db: ", rows);
  });
};

const update = () => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    console.log("data from db: ", rows);
  });
};

const remove = () => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    console.log("data from db: ", rows);
  });
};

export default { get, create, update, remove };
