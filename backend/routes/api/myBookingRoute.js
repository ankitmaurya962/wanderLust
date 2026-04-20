const express = require('express');
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync")
const{myBooking} = require("../../controllers/mybooking");
const {isLoggedIn} = require("../../middleware");

router.get('/mybooking', isLoggedIn, wrapAsync(myBooking));

module.exports = router;