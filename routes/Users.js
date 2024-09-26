const express = require('express');
const {sendText, receiveText,setPost, getPost } = require('../controllers/users');
const router = express.Router();



router.post("/send",sendText)
router.post("/receive",receiveText)
router.post("/send",sendText);
router.post("/receive",receiveText);
router.post("/post",setPost);
router.get('/posts/:slug',getPost);


module.exports = router;