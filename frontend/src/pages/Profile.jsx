import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          bio: response.data.bio || "",
          avatar: response.data.avatar,
        });
      } catch (error) {
        alert("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put("/api/auth/profile", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-gray-100 p-6 shadow-md rounded">
        <div>
          <h1 className="text-2xl font-bold mb-5 text-center">Profile</h1>
          <div className="flex flex-col items-center">
            <img
              src={formData.avatar}
              alt={`${formData.name}'s avatar`}
              className="w-12 h-12 rounded-full"
            />
            <div className="mb-5 p-2">{formData.email}</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
