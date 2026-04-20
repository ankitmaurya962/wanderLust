const express = require('express');
const router = express.Router();
const {bookingController} = require('../../controllers/booking')
const {bookingValidate, isLoggedIn} = require('../../middleware')
const wrapAsync = require("../../utils/wrapAsync")

router.post('/bookings', isLoggedIn, bookingValidate, wrapAsync(bookingController));

module.exports = router;