const express = require('express');
const router = express.Router();
const {verifyController} = require('../../controllers/verify')

router.post("/verify-payment", verifyController);

module.exports = router;