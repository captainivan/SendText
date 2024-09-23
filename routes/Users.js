const express = require('express');
const {sendText, receiveText} = require('../controllers/users');
const router = express.Router();



router.post("/send",sendText)
router.post("/receive",receiveText)


module.exports = router;