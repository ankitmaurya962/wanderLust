const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../../utils/wrapAsync");
const {
  reviewValidate,
  isAuthor,
  isLoggedIn,
} = require("../../middleware");
const reviewController = require("../../controllers/apiReview");

router.post(
  "/reviews",
  isLoggedIn,
  reviewValidate,
  wrapAsync(reviewController.createReview),
);

router.delete(
  "/reviews/:ReviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
