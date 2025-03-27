import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import LikeButton from "./LikeButton";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

const SinglePost = ({
  post: {
    _id: pid,
    location,
    caption,
    createdAt,
    userId: { username, avatar, _id: uid },
  },
  hasLiked,
  parentDeletePost,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedTexts, setEditedTexts] = useState({});

  const getCommentsByPostId = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/comments/${pid}`);

      const comments = response.data;
      setComments(comments);
      setCommentCount(comments.length);
    } catch (error) {
      console.log("postComment failed", error);
    }
  }, [pid]);

  const getLikeCount = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/likes/${pid}/count`);
      setLikeCount(response.data.count);
    } catch (error) {
      console.error("getLikeCount error", error);
    }
  }, [pid]);

  useEffect(() => {
    getLikeCount();
    getCommentsByPostId();
  }, [getCommentsByPostId, getLikeCount]);

  const deletePost = async () => {
    try {
      await axiosInstance.delete(`/api/posts/${pid}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      parentDeletePost(pid);
      getCommentsByPostId();
      alert("post deleted");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const goEditPage = () => {
    navigate(`/edit-post/${pid}`);
  };

  const handlePostComment = async () => {
    try {
      await axiosInstance.post(
        `/api/comments/${pid}`,
        { comment, userId: uid, postId: pid },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setComment("");
      getCommentsByPostId();
    } catch (error) {
      console.log("postComment failed", error);
    }
  };

  function handleEditing(commentObj) {
    const { _id, comment } = commentObj;
    if (editingCommentId === _id) {
      setEditingCommentId(null);
    } else {
      setEditingCommentId(_id);
      setEditedTexts((prev) => ({ ...prev, [_id]: comment }));
    }
  }

  const handleUpdateComment = async (commentId) => {
    try {
      await axiosInstance.put(
        `/api/comments/${commentId}`,
        { comment: editedTexts[commentId] },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, comment: editedTexts[commentId] }
            : comment
        )
      );
      setEditingCommentId(null);
      setEditedTexts((prev) => {
        const updated = { ...prev };
        delete updated[commentId];
        return updated;
      });
      alert("Comment updated");
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      getCommentsByPostId();
      alert("Comment deleted");
    } catch (error) {
      console.log("postComment failed", error);
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
                  getLikeCount={getLikeCount}
                />
                <span className="text-sm font-bold">{likeCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="h-6 w-6 text-gray-600" />
                <span className="text-sm font-bold">{commentCount}</span>
              </div>
            </div>
            {user?.id === uid && (
              <div className="flex space-x-4 text-sm">
                <PencilSquareIcon
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={goEditPage}
                />
                <TrashIcon
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={deletePost}
                />
              </div>
            )}
          </div>
          <p className="text-sm">
            <span className="text-sm font-bold inline-block mr-1">
              {username}
            </span>
            {caption}
          </p>
          <p className="text-gray-400 text-xs font-[500] mt-2"></p>
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  className="flex justify-between"
                  key={comment._id}
                >
                  <div className="text-sm flex">
                    <span>{comment.userId.username}:</span>

                    {editingCommentId === comment._id ? (
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Edit your comment here..."
                          value={editedTexts[comment._id] || ""}
                          onChange={(e) =>
                            setEditedTexts((prev) => ({
                              ...prev,
                              [comment._id]: e.target.value,
                            }))
                          }
                          className="w-full text-sm border rounded-l"
                        />
                        <button
                          type="submit"
                          className="text-sm rounded-r bg-blue-500 text-white px-2"
                          onClick={() => handleUpdateComment(comment._id)}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <span className="ml-1">{comment.comment}</span>
                    )}
                  </div>

                  {user?.id && comment.userId._id === user.id && (
                    <div className="text-sm text-gray-400">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleEditing(comment)}
                      >
                        {editingCommentId === comment._id ? "Cancel" : "Edit"}
                      </span>
                      <span> | </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-300 underline">
                No comment yet, leave a comment below.
              </span>
            )}
          </div>
          {user && (
            <div className="flex mt-3">
              <input
                type="text"
                placeholder="Leave a comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full text-sm border rounded-l"
              />
              <button
                type="submit"
                className="text-sm rounded-r bg-blue-500 text-white px-2"
                onClick={handlePostComment}
              >
                Reply
              </button>
            </div>
          )}
          <p className="text-gray-400 text-[10px] mt-1">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
