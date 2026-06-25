const Listing = require("./models/listing");
const { listingSchema, reviewSchema, bookingSchema } = require("./schema");
const Review = require("./models/review");
const mongoose = require("mongoose");

// AUTH CHECK

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "You must login first",
    });
  }

  next();
};

//OWNER CHECK

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const list = await Listing.findById(id);

  if (!list) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  if (!req.user || !list.owner._id.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You are not owner of this listing",
    });
  }

  next();
};


//REVIEW AUTHOR CHECK

module.exports.isAuthor = async (req, res, next) => {
  const { ReviewId } = req.params;
  const review = await Review.findById(ReviewId);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  //safe comparison
  if (
    !req.user ||
    review.author.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      success: false,
      message: "You cannot edit others review",
    });
  }

  next();
};


//LISTING VALIDATION

module.exports.validate = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");

    return res.status(400).json({
      success: false,
      message: errMsg,
    });
  }

  next();
};

// REVIEW VALIDATION

module.exports.reviewValidate = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");

    return res.status(400).json({
      success: false,
      message: errMsg,
    });
  }

  next();
};

//Booking Validation
module.exports.bookingValidate = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");

    return res.status(400).json({
      success: false,
      message: errMsg,
    });
  }

  next();
};

//ObjectId Validation
module.exports.validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  next();
};

