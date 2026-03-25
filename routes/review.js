const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn} = require("../middleware");
const{reviewValidate} = require("../middleware");

//review
router.post(
  "/reviews",
  reviewValidate,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added!");
    res.redirect(`/listing/${listing._id}`);
  }),
);
//delete review
router.delete(
  "/reviews/:ReviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id, ReviewId } = req.params;
    await Review.findByIdAndDelete(ReviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: ReviewId}})
    req.flash("success", "Review Deleted!");
    res.redirect(`/listing/${id}`);
  }),
);

module.exports = router;