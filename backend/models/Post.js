const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
  },
  caption: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    default: 0,
  },
  comments: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model('Post', postSchema);
