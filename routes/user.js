const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    console.log(await User.register(newUser, password));
    req.flash("success", "user registered successfully!");
    res.redirect("/listing");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}));

module.exports = router;
