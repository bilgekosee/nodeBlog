const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

router.get("/", (req, res) => {
  res.render("admin/index");
});
router.get("/categories", async (req, res) => {
  const categories = await Category.find({}).lean();
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

module.exports = router;
