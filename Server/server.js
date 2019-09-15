const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
//const Data = require("./data");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  "mongodb+srv://benmandr:uplife@uplifedb-dc9pb.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//GET
router.get("/get", (req, res) => {
  return res.json({ data: "GET request" });
});

//UPDATE
router.post("/update", (req, res) => {
  return res.json({ data: "UPDATE request" });
});

//DELETE
router.delete("/delete", (req, res) => {
  return res.json({ data: "DELETE request" });
});

//CREATE
router.post("/put", (req, res) => {
  return res.json({ data: "PUT request" });
});

app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
