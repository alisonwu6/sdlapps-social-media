import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import LikeButton from "./LikeButton";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

const PostList = ({
  _id: pid,
  location,
  caption,
  createdAt,
  userId: { username, avatar, _id: uid },
  hasLiked,
  parentDeletePost,
}) => {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const getLikeCount = async () => {
      try {
        const response = await axiosInstance.get(`/api/likes/${pid}/count`);
        setLikeCount(response.data.count);
      } catch (error) {
        console.error("getLikeCount error", error);
      }
    };
    getLikeCount();
  }, [pid]);

  const deletePost = async () => {
    try {
      await axiosInstance.delete(`/api/posts/${pid}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      parentDeletePost(pid); // delete this post on the list page.
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="border-2 rounded mb-4">
      <div className="flex h-[70px] items-center box-border px-4">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <p className="font-bold text-sm">{username}</p>
          <p className="text-gray-400 text-xs">{location}</p>
        </div>
      </div>
      <div className="pb-4">
        <div className="px-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <LikeButton
                  postId={pid}
                  userId={uid}
                  hasLiked={hasLiked}
                />
                <span className="text-sm font-bold">{likeCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
                <span className="text-sm font-bold">2</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <PencilSquareIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
              <TrashIcon
                className="h-6 w-6 text-gray-600 cursor-pointer"
                onClick={deletePost}
              />
            </div>
          </div>
          <p className="text-sm">
            <span className="text-sm font-bold inline-block mr-1">
              {username}
            </span>
            {caption}
          </p>
          <p className="text-gray-400 text-xs font-[500] mt-2">
            View all 999 comments
          </p>
          <p className="text-gray-400 text-[10px] mt-1">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default PostList;
