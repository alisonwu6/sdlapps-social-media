import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import { useParams } from "react-router-dom";

const PostForm = () => {
  const { user } = useAuth();
  const { postId } = useParams();
  const editingPost = Boolean(postId);

  const [formData, setFormData] = useState({
    location: "",
    caption: "",
  });

  useEffect(() => {
    if (!postId) return;
    const getPostById = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${postId}`);
        setFormData(response.data);
      } catch (error) {
        console.log("getPostById", error.message);
      }
    };

    getPostById();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await axiosInstance.put(`/api/posts/${postId}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Post updated");
      } else {
        await axiosInstance.post("/api/posts", formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Post created");
        setFormData({ location: "", caption: "" });
      }
    } catch (error) {
      alert("Failed to save post.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mb-6"
    >
      <h1 className="text-2xl font-bold mb-4">
        {editingPost ? "Edit Post" : "Add a post"}
      </h1>
      <input
        type="text"
        placeholder="Add a location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        type="text"
        placeholder="Add a caption"
        value={formData.caption}
        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {editingPost ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
};

export default PostForm;
