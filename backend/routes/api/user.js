const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync.js");
const passport = require("passport");

const usersController = require("../../controllers/apiUsers.js");

//sign up
router
  .route("/signup")
  .post(wrapAsync(usersController.signup));

//sign in
router.route("/signin")
.post(
  passport.authenticate("local"),
  usersController.login,
);

// CURRENT USER (add this)
router.get("/current", (req, res) => {
  res.json(req.user || null);
});

router.get("/logout", usersController.logout);

module.exports = router;
