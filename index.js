require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./src/middlewares/is_auth.middleware");
const { File } = require("./src/models/files");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);

app.use(require("./routes"));

app.listen(3000);
