const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const path = require("path");
const Category = require("../models/Category");
const User = require("../models/User");

router.get("/new", (req, res) => {
  if (!req.session.userId) {
    res.redirect("users/login");
  }
  Category.find({})
    .lean()
    .then((categories) => {
      res.render("site/addpost", { categories: categories });
    });
});
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate({ path: "author", model: User })
    .lean()
    .then((post) => {
      Category.find({})
        .lean()
        .then((categories) => {
          res.render("site/post", { post: post, categories: categories });
        });
    });
});
router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(
    path.resolve(__dirname, "../public/img/postImages", post_image.name)
  );
  Post.create({
    ...req.body,
    post_image: `/img/postImages/${post_image.name}`,
    author: req.session.userId,
  });
  req.session.sessionFlash = {
    type: "alert alert-success",
    message: "Postunuz başarılı bir şekilde oluşturuldu",
  };

  res.redirect("/blog");
});
module.exports = router;
