const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn} = require("../middleware");
const{reviewValidate, isAuthor} = require("../middleware");

const reviewController = require("../controllers/reviews");

//review
router.post(
  "/reviews",
  reviewValidate,
  isLoggedIn,
  wrapAsync(reviewController.createReview),
);

//delete review
router.delete(
  "/reviews/:ReviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview),
);


module.exports = router;