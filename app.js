const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const app = express();
const path = require("path");

mongoose
  .connect("mongodb://127.0.0.1:27017/nodeblog_db")
  .then(() => console.log("Connected!"));

app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

const main = require("./routes/main");
app.use("/", main);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
