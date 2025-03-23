const express = require("express");
const {
  toggleLike,
  getUserLikedPostId,
  getPostLikeCount,
} = require("../controllers/postLikeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("").post(protect, toggleLike);
router.route("/user-likes").get(protect, getUserLikedPostId);
router.route("/:postId/count").get(getPostLikeCount);

module.exports = router;
