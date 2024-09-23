const express = require('express');
const {sendText, receiveText} = require('../controllers/users');
const router = express.Router();

router.get("/",(req,res)=>{
  res.send({message:"hello world from route"});
})

router.post("/send",sendText)
router.post("/receive",receiveText)


module.exports = router;