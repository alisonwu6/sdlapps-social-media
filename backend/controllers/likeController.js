const Post = require("../models/Post");
const PostLike = require("../models/PostLike");

const toggleLike = async (req, res) => {
  const { userId, postId } = req.body;
  console.log("controller", userId, postId);

  try {
    const hasLiked = await PostLike.findOne({ userId, postId });
    // TODO to avoid duplicate
    if (hasLiked) {
      await PostLike.deleteOne({ _id: hasLiked._id });
      return res.status(200).json({ liked: false });
    } else {
      await PostLike.create({ userId, postId });
      return res.status(201).json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { toggleLike };
