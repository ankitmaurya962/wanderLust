const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync")
const apiListingController = require("../../controllers/apiListings");
const {isLoggedIn, validate, isOwner} = require("../../middleware")



router
  .route("/")
  .get(
    wrapAsync(apiListingController.index), //index route
  )
  .post(isLoggedIn, validate, wrapAsync(apiListingController.newListing)); //create


router
  .route("/:id")
  .get(wrapAsync(apiListingController.show))
  .patch(isLoggedIn, validate, isOwner, wrapAsync(apiListingController.edit))
  .delete(isLoggedIn,isOwner, wrapAsync(apiListingController.delete));

module.exports = router;
