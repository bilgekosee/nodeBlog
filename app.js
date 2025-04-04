const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const moment = require("moment");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/nodeblog_db")
  .then(() => console.log("Connected!"));

app.use(fileUpload());
app.use(express.static("public"));

const hbs = exphbs.create({
  helpers: {
    generateDate: (date, format) => {
      return moment(date).format(format);
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

const main = require("./routes/main");
const posts = require("./routes/posts");
app.use("/", main);
app.use("/posts", posts);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
