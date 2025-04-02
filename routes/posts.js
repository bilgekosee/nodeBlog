const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/new", (req, res) => {
  res.render("site/addpost");
});
router.post("/test", (req, res) => {
  Post.create(req.body);
  res.redirect("/");
});
module.exports = router;
