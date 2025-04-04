const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/generateDate").generateDate;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/nodeblog_db")
  .then(() => console.log("Connected!"));

app.use(fileUpload());
app.use(express.static("public"));

app.engine("handlebars", engine({ helpers: { generateDate: generateDate } }));
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
