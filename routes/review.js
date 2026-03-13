const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing");
const Review = require("../models/review");
const CustomError = require("../utils/CustomError");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema");

//review validation
const reviewValidate = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new CustomError(400, errMsg);
  } else {
    next();
  }
};

//review
router.post(
  "/reviews",
  reviewValidate,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    console.log(req.body);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();

    res.redirect(`/listing/${listing._id}`);
  }),
);
//delete review
router.delete(
  "/reviews/:ReviewId",
  wrapAsync(async (req, res) => {
    const { id, ReviewId } = req.params;
    await Review.findByIdAndDelete(ReviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: ReviewId}})
    res.redirect(`/listing/${id}`);
  }),
);

module.exports = router;