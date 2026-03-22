const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
//sign up
router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email });
      await User.register(newUser, password);
      req.flash("success", "user registered successfully!");
      res.redirect("/listing");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }),
);

//sign in
router.get("/signin", (req, res) => {
  res.render("./users/signin.ejs");
});

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  async(req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listing");
  }
);

module.exports = router;
