const Listing = require("./models/listing");
const { listingSchema } = require("./schema");
const CustomError = require("./utils/CustomError");
const { reviewSchema } = require("./schema");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must login first!");
    return res.redirect("/signin");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const list = await Listing.findById(id);
  if (res.locals.currUser && !list.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not owner of listing");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id, ReviewId } = req.params;
  const review= await Review.findById(ReviewId);
  const reviewAuthor = review.author;
  if (res.locals.currUser && !reviewAuthor.equals(res.locals.currUser._id)) {
    req.flash("error", "you cannot edit others review");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

//validation for listing
module.exports.validate = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new CustomError(400, errMsg);
  } else {
    next();
  }
};

//review validation
module.exports.reviewValidate = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new CustomError(400, errMsg);
  } else {
    next();
  }
};
