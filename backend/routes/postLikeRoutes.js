const express = require("express");
const {
  toggleLike,
  getUserLikedPostId,
} = require("../controllers/postLikeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("").post(protect, toggleLike);
router.route("/user-likes").get(protect, getUserLikedPostId);

module.exports = router;
