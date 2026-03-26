const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validate } = require("../middleware");
const listingController = require("../controllers/listings");

router
  .route("/")
  .get(
    wrapAsync(listingController.index), //index route
  )
  .post(isLoggedIn, validate, wrapAsync(listingController.newListing)); //create

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.show)) //show
  .patch(
    isLoggedIn,
    isOwner,
    validate,
    wrapAsync(listingController.edit), //edit
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete)); //delete

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);
module.exports = router;
