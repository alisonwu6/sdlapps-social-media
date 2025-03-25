const PostComment = require("../models/PostComment");

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    const response = await PostComment.create({
      postId: postId,
      userId: req.user._id,
      comment,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsById = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await PostComment.find({ postId: postId })
      .populate({
        path: "userId",
        select: "username",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  // console.log('commentId', commentId)

  try {
    const comment = await PostComment.findById(commentId);

    await PostComment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getCommentsById, deleteComment };
