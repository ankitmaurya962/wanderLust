const express = require('express');
const router = express.Router();
const {verifyController} = require('../../controllers/verify');
const wrapAsync = require("../../utils/wrapAsync");

router.post("/verify-payment", verifyController);

module.exports = router;