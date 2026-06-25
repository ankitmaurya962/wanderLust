const express = require("express");
const router = express.Router();
const { createOrder } = require("../../controllers/razorpay");
const { isLoggedIn } = require("../../middleware");
const wrapAsync = require("../../utils/wrapAsync");

router.post("/create-order", isLoggedIn, wrapAsync(createOrder));

module.exports = router;
