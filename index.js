require("dotenv").config();
const express = require("express");
const cors = require("cors");
const process = require('process'); 
const app = express();
const auth = require("./src/middlewares/is_auth.middleware");
const { File } = require("./src/models/files");

process.on('SIGINT', function onSigint() {
  app.shutdown();
});

process.on('SIGTERM', function onSigterm() {
  app.shutdown();
});

app.shutdown = function () {
  process.exit();
};

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);


app.use(require("./routes"));

app.listen(3000);
