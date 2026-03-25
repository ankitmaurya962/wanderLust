const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validate } = require("../middleware");
const listingController = require("../controllers/listing");
//index route
router.get(
  "/",
  wrapAsync(listingController.index),
);

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);
//create
router.post(
  "/",
  isLoggedIn,
  validate,
  wrapAsync(listingController.newListing),
);

//show
router.get(
  "/:id",
  wrapAsync(listingController.show),
);

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  validate,
  wrapAsync(listingController.edit),
);

//delete
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.delete),
);

module.exports = router;
