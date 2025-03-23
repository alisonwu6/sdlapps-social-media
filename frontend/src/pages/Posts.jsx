import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import SinglePost from "../components/SinglePost";

const Posts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        alert("Failed to fetch posts.");
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const fetchUserLikes = async () => {
      try {
        console.log("user", user);
        const response = await axiosInstance.get("/api/likes/user-likes", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUserLikes(response.data.likedPostIds);
      } catch (error) {
        alert("fetchUserLikes error:", error.response?.data || error.message);
      }
    };
    fetchUserLikes();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      {posts.map((post) => (
        <SinglePost
          {...post}
          key={post._id}
          hasLiked={userLikes.includes(post._id)}
        />
      ))}
    </div>
  );
};

export default Posts;
