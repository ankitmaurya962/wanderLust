const Listing = require("../models/listing");
const Review = require("../models/review");

// 🔹 CREATE REVIEW
module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview._id);

  await newReview.save();
  await listing.save();
  console.log("USER:", req.user);
  // ✅ React-friendly response
  res.status(201).json({
    success: true,
    message: "Review added successfully",
    review: newReview,
  });
};

// 🔹 DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
  const { id, ReviewId } = req.params;

  await Review.findByIdAndDelete(ReviewId);

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: ReviewId },
  });

  // ✅ React-friendly response
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
};
