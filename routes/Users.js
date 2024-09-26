const express = require('express');
<<<<<<< HEAD
const {sendText, receiveText} = require('../controllers/users');
=======
const {sendText, receiveText,setPost, getPost } = require('../controllers/users');
>>>>>>> 7c458f9 (Initial commit)
const router = express.Router();



<<<<<<< HEAD
router.post("/send",sendText)
router.post("/receive",receiveText)
=======
router.post("/send",sendText);
router.post("/receive",receiveText);
router.post("/post",setPost);
router.get('/posts/:slug',getPost);
>>>>>>> 7c458f9 (Initial commit)


module.exports = router;