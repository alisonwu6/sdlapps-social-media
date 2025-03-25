const express = require("express");
const {
  getCommentsById,
  addComment,
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
  .delete(protect, deleteComment);

module.exports = router;
