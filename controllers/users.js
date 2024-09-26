const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Text = require('../models/text');
<<<<<<< HEAD

const formatId = () => {
  const uuid = uuidv4().replace(/\D/g, '');
  const sixDigitCode = uuid.slice(0, 6);
  return sixDigitCode;
}
=======
const Post = require('../models/Post');
const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-encryption-key'; 
const IV_LENGTH = 16; 

const formatId = () => {
  const uuid = uuidv4().replace(/\D/g, '');
  return uuid.slice(0, 6);
};


const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};


const decrypt = (text) => {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const setPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-'); 
    const newPost = new Post({ title, body, slug });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post', error });
  }
};
>>>>>>> 7c458f9 (Initial commit)

const sendText = async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length === 0) {
<<<<<<< HEAD
    return res.status(400).json({ messageError: "Text content is required." });
  }

  const newText = new Text({
    id: formatId(),
    text
=======
    return res.status(400).json({ message: 'Text content is required.' });
  }

  const encryptedText = encrypt(text); 

  const newText = new Text({
    id: formatId(),
    text: encryptedText
>>>>>>> 7c458f9 (Initial commit)
  });

  try {
    const existingText = await Text.findOne({ id: newText.id });
    if (existingText) {
      return res.status(409).json({ messageError: "ID conflict. Try again." });
    }

    await newText.save();
<<<<<<< HEAD
    res.status(201).json({message:"Text sended sucessfully",newText});
=======
    res.status(201).json({ message: "Text sent successfully", newText });
>>>>>>> 7c458f9 (Initial commit)
  } catch (err) {
    res.status(500).json({ messageError: err.message });
  }
}

const receiveText = async (req, res) => {
  const { id } = req.body;
  if (!id || id.trim().length !== 6) {
<<<<<<< HEAD
    return res.status(400).json({ messageerror: "Valid ID is required." });
=======
    return res.status(400).json({ messageError: "Valid ID is required." });
>>>>>>> 7c458f9 (Initial commit)
  }

  try {
    const text = await Text.findOne({ id });
    if (!text) {
      return res.status(404).json({ messageError: "Text not found" });
    }
<<<<<<< HEAD
    res.status(200).json({message:"Text Recived sucessfully",text});
  } catch (error) {
    res.status(500).json({ messageerror: error.message });
  }
}

module.exports = { sendText, receiveText };
=======

    const decryptedText = decrypt(text.text); 
    res.status(200).json({ message: "Text received successfully", text: decryptedText });
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
}

module.exports = { sendText, receiveText, setPost, getPost };
>>>>>>> 7c458f9 (Initial commit)
