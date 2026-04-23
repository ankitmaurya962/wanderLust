const express = require('express');
const router = express.Router();
const {bookingController, cancelBooking, previewRefund} = require('../../controllers/booking')
const {bookingValidate, isLoggedIn} = require('../../middleware')
const wrapAsync = require("../../utils/wrapAsync")

router.post('/bookings', isLoggedIn, bookingValidate, wrapAsync(bookingController))
.patch('/bookings/:id/cancel', wrapAsync(cancelBooking))
.get('/bookings/:id/refund-preview', wrapAsync(previewRefund));

module.exports = router;

