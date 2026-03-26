const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usersController = require("../controllers/users.js");

//sign up
router
  .route("/signup")
  .get(usersController.renderSignupForm)
  .post(wrapAsync(usersController.signup));

//sign in
router.route("/signin")
.get(usersController.renderSigninForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  usersController.login,
);

router.get("/logout", usersController.logout);

module.exports = router;
