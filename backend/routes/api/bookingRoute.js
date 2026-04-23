const express = require('express');
const router = express.Router();
const {bookingController, cancelBooking, previewRefund, deleteBooking} = require('../../controllers/booking')
const {bookingValidate, isLoggedIn} = require('../../middleware')
const wrapAsync = require("../../utils/wrapAsync")

router.post('/bookings', isLoggedIn, bookingValidate, wrapAsync(bookingController))
.patch('/bookings/:id/cancel', isLoggedIn, wrapAsync(cancelBooking))
.get('/bookings/:id/refund-preview', isLoggedIn, wrapAsync(previewRefund))
.delete('/bookings/:id', isLoggedIn, wrapAsync(deleteBooking));

module.exports = router;

