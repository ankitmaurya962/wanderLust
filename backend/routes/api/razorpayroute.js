const express = require("express");
const router = express.Router();
const { createOrder } = require("../../controllers/razorpay");
const { isLoggedIn, bookingValidate } = require("../../middleware");

router.post("/create-order", isLoggedIn, createOrder);

module.exports = router;
