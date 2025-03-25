const mongoose = require("mongoose");

const PostLikeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// only like a single post once. 
PostLikeSchema.index({ user: 1, post: 1}, {unique: true});

module.exports = mongoose.model("PostLike", PostLikeSchema);