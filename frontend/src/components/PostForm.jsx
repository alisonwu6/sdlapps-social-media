import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const PostForm = ({ posts, setPosts, editingPost, setEditingPost }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    location: '',
    caption: '',
    img: '',
    createdAt: '',
  });

  useEffect(() => {
    if (editingPost) {
      setFormData({
        location: editingPost.location,
        caption: editingPost.caption,
        img: editingPost.img,
      });
    } else {
      setFormData({ location: '', caption: '', img: '' });
    }
  }, [editingPost]);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      if (editingPost) {
        const response = await axiosInstance.put(`/api/posts/${editingPost._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPosts(posts.map((post) => (post._id === response.data._id ? response.data : post)));
      } else {
        const response = await axiosInstance.post('/api/posts', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('response.data', response.data);
        setPosts([...posts, response.data]);
      }
      setEditingPost(null);
      setFormData({ location: '', caption: '', img: '' });
    } catch (error) {
      alert('Failed to save post.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 shadow-md rounded mb-6'
    >
      <h1 className='text-2xl font-bold mb-4'>
        {editingPost ? 'Edit Post' : 'Add a post'}
      </h1>
      <input
        type='text'
        placeholder='Add a location'
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className='w-full mb-4 p-2 border rounded'
      />
      <textarea
        type='text'
        placeholder='Add a caption'
        value={formData.caption}
        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
        className='w-full mb-4 p-2 border rounded'
      />
      <button
        type='submit'
        className='w-full bg-blue-600 text-white p-2 rounded'
      >
        {editingPost ? 'Update Post' : 'Add Post'}
      </button>
    </form>
  );
};

export default PostForm;
