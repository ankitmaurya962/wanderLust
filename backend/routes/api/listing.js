const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync")
const apiListingController = require("../../controllers/apiListings");
const {isLoggedIn, validate, isOwner, validateObjectId} = require("../../middleware")
const multer = require('multer')
const {storage} = require("../../cloudConfig");
const upload = multer({storage})

router
  .route("/")
  .get(
    wrapAsync(apiListingController.index), //index route
  )
  .post(isLoggedIn, upload.single('image'), validate, wrapAsync(apiListingController.newListing)); //create


router
  .route("/:id")
  .get(validateObjectId, wrapAsync(apiListingController.show))
  .patch(isLoggedIn, validateObjectId, upload.single("image") ,validate, isOwner, wrapAsync(apiListingController.edit)) //edit 
  .delete(isLoggedIn, validateObjectId, isOwner, wrapAsync(apiListingController.delete)); //delete

module.exports = router;
