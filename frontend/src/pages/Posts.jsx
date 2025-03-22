import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import SinglePost from "../components/SinglePost";

const Posts = () => {
  const [posts, setPosts] = useState([]);

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
  });

  return (
    <div className="container mx-auto p-6">
      {posts.map((post) => (
        <SinglePost
          {...post}
          key={post._id}
        />
      ))}
    </div>
  );
};

export default Posts;
