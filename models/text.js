const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true  
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '20m'
  }
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
