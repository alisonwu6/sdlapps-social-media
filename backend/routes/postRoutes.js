const express = require("express");
const {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/")
  .get(getPosts)
  .post(protect, addPost);
router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
