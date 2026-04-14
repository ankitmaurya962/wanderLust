const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require("./schema");
const CustomError = require("./utils/CustomError");
const Review = require("./models/review");

// 🔥 Helper: detect API request
const isApiRequest = (req) => req.originalUrl.startsWith("/api");

// =============================
// 🔐 AUTH CHECK
// =============================
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {

    // 👉 React / API
    if (isApiRequest(req)) {
      return res.status(401).json({
        success: false,
        message: "You must login first",
      });
    }

    // 👉 EJS (existing site)
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must login first!");
    return res.redirect("/signin");
  }

  next();
};

// =============================
// 🔁 SAVE REDIRECT (EJS only)
// =============================
module.exports.saveRedirectUrl = (req, res, next) => {
  if (!isApiRequest(req) && req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// =============================
// 👤 OWNER CHECK
// =============================
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const list = await Listing.findById(id);

  if (!req.user || !list.owner._id.equals(req.user._id)) {

    if (isApiRequest(req)) {
      return res.status(403).json({
        success: false,
        message: "You are not owner of this listing",
      });
    }

    req.flash("error", "You are not owner of listing");
    return res.redirect(`/listing/${id}`);
  }

  next();
};

// =============================
// ✍️ REVIEW AUTHOR CHECK
// =============================
module.exports.isAuthor = async (req, res, next) => {
  const { id, ReviewId } = req.params;
  const review = await Review.findById(ReviewId);

  // 🔐 safe comparison
  if (
    !req.user ||
    review.author.toString() !== req.user._id.toString()
  ) {
    if (isApiRequest(req)) {
      return res.status(403).json({
        success: false,
        message: "You cannot edit others review",
      });
    }

    req.flash("error", "You cannot edit others review");
    return res.redirect(`/listing/${id}`);
  }

  next();
};

// =============================
// ✅ LISTING VALIDATION
// =============================
module.exports.validate = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");

    if (isApiRequest(req)) {
      return res.status(400).json({
        success: false,
        message: errMsg,
      });
    }

    throw new CustomError(400, errMsg);
  }

  next();
};

// =============================
// ✅ REVIEW VALIDATION
// =============================
module.exports.reviewValidate = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");

    if (isApiRequest(req)) {
      return res.status(400).json({
        success: false,
        message: errMsg,
      });
    }

    throw new CustomError(400, errMsg);
  }

  next();
};