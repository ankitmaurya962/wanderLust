const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync")
const apiListingController = require("../../controllers/apiListings");

// GET all listings
router.get("/", wrapAsync(apiListingController.index));

// GET single listing
router.get("/:id", wrapAsync(apiListingController.show));

module.exports = router;
