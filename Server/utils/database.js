import mysql from "mysql";

const db = mysql.createConnection({
  host: "sql7.freemysqlhosting.net",
  user: "sql7305427",
  password: "K9iwAy6vyT",
  database: "sql7305427"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

export default db;
