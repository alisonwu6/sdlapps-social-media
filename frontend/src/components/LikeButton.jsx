import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

const LikeButton = ({ postId, userId, hasLiked, getLikeCount }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(hasLiked);

  const toggleLike = async () => {
    if (!user) {
      alert("Still not a member? Join us right now!");
      return;
    }
    try {
      await axiosInstance.post(
        `api/likes`,
        {
          postId,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setIsLiked(!isLiked);
      getLikeCount();
    } catch (error) {
      alert("Failed to change status of like");
      setIsLiked(isLiked);
    }
  };

  return (
    <button onClick={toggleLike}>
      {isLiked ? (
        <HeartSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartOutline className="h-6 w-6 text-black" />
      )}
    </button>
  );
};

export default LikeButton;
