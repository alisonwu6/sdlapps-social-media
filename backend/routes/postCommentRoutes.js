const express = require("express");
const {
  getCommentsById,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/postComment");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/:postId")
  .get(getCommentsById)
  .post(protect, addComment);

router
  .route("/:commentId")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
