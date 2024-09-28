const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Text = require('../models/text');
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
    const { title,image,description, body } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-'); 
    const newPost = new Post({ title,image,description, body, slug });
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

const sendText = async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ messageError: "Text content is required." });
  }

  const encryptedText = encrypt(text);

  const newText = new Text({
    id: formatId(),
    text: encryptedText
  });

  try {
    const existingText = await Text.findOne({ id: newText.id });
    if (existingText) {
      return res.status(409).json({ messageError: "ID conflict. Try again." });
    }

    await newText.save();
    res.status(201).json({ message: "Text sent successfully", newText });
  } catch (err) {
    res.status(500).json({ messageError: err.message });
  }
};

const receiveText = async (req, res) => {
  const { id } = req.body;
  if (!id || id.trim().length !== 6) {
    return res.status(400).json({ messageError: "Valid ID is required." });
  }

  try {
    const text = await Text.findOne({ id });
    if (!text) {
      return res.status(404).json({ messageError: "Text not found" });
    }
  const decryptedText = decrypt(text.text);
    text.text = text.text.replace(text.text,decryptedText)
    res.status(200).json({text});
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
};

const getAllPost = async (req, res) => {
  try{
    const posts = await Post.find();
    res.status(201).json(posts);
  }catch(error){
    res.status(500).json({messageError:error.message})
  }
}

module.exports = { sendText, receiveText, setPost, getPost ,getAllPost };
