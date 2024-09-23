const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Text = require('../models/text');

const formatId = () => {
  const uuid = uuidv4().replace(/\D/g, '');
  const sixDigitCode = uuid.slice(0, 6);
  return sixDigitCode;
}

const sendText = async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ messageError: "Text content is required." });
  }

  const newText = new Text({
    id: formatId(),
    text
  });

  try {
    const existingText = await Text.findOne({ id: newText.id });
    if (existingText) {
      return res.status(409).json({ messageError: "ID conflict. Try again." });
    }

    await newText.save();
    res.status(201).json({message:"Text sended sucessfully",newText});
  } catch (err) {
    res.status(500).json({ messageError: err.message });
  }
}

const receiveText = async (req, res) => {
  const { id } = req.body;
  if (!id || id.trim().length !== 6) {
    return res.status(400).json({ messageerror: "Valid ID is required." });
  }

  try {
    const text = await Text.findOne({ id });
    if (!text) {
      return res.status(404).json({ messageError: "Text not found" });
    }
    res.status(200).json({message:"Text Recived sucessfully",text});
  } catch (error) {
    res.status(500).json({ messageerror: error.message });
  }
}

module.exports = { sendText, receiveText };
