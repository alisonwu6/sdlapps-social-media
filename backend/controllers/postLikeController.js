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

const getUserLikedPostId = async (req, res) => {
  const userId = req.user._id;

  try {
    const likes = await PostLike.find({ userId }).select("postId -_id");
    const likedPostIds = likes.map((like) => like.postId.toString());
    res.status(200).json({ likedPostIds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// total likes of a post
const getPostLikeCount = async (req, res) => {
  const { postId } = req.params;

  try {
    const count = await PostLike.countDocuments({ post: postId });
    console.log("count", count);
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { toggleLike, getUserLikedPostId, getPostLikeCount };
