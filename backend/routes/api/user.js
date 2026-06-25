const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync");
const passport = require("passport");
const usersController = require("../../controllers/apiUsers");

router.post("/signup", wrapAsync(usersController.signup));

router.post(
  "/signin",
  passport.authenticate("local"),
  wrapAsync(usersController.login),
);

router.get("/current", (req, res) => {
  res.json(req.user || null);
});

router.get("/logout", wrapAsync(usersController.logout));

module.exports = router;
