const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/register", (req, res) => {
  res.render("site/register");
});

router.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

router.get("/login", (req, res) => {
  res.render("site/login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        //user session
        res.redirect("/");
      } else {
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/register");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/users/register");
  }
});

module.exports = router;
