const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");
const Post = require("../../models/Post");
const User = require("../../models/User");

router.get("/", (req, res) => {
  res.render("admin/index");
});
router.get("/categories", async (req, res) => {
  const categories = await Category.find({}).sort({ $natural: -1 }).lean();
  res.render("admin/categories", { categories: categories });
});

router.post("/categories", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.redirect("categories");
  } catch (error) {
    console.error("Kategori oluşturulurken hata:", error);
    res.status(500).send("Bir hata oluştu.");
  }
});

router.delete("/categories/:id", async (req, res) => {
  await Category.findByIdAndDelete({ _id: req.params.id }).then(() => {
    res.redirect("/admin/categories");
  });
});

router.get("/posts", async (req, res) => {
  Post.find({})
    .populate({ path: "category", model: Category })
    .sort({ $natural: -1 })
    .lean()
    .then((posts) => {
      res.render("admin/posts", { posts: posts });
    });
});

module.exports = router;
