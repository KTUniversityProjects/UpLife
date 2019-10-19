import mysql from "mysql";

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
    console.log("Connected to database");
  });
};

export default db;
