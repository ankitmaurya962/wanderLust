const express = require('express');
const router = express.Router();
const {bookingController, cancelBooking} = require('../../controllers/booking')
const {bookingValidate, isLoggedIn} = require('../../middleware')
const wrapAsync = require("../../utils/wrapAsync")

router.post('/bookings', isLoggedIn, bookingValidate, wrapAsync(bookingController))
.patch('/bookings/:id/cancel', wrapAsync(cancelBooking));

module.exports = router;

