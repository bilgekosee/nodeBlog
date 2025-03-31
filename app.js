const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("site/index");
});
app.get("/about", (req, res) => {
  res.render("site/about");
});
app.get("/blog", (req, res) => {
  res.render("site/blog");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
