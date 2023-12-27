const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: String,
  dogName: String,
  description: String,
  images: [],
  likes: Number,
  comments: [],
  zone: String,
});

const Post = mongoose.model('Post', postSchema, 'posts');

const savePost = async (postData) => {
    try {
      const newPost = new Post(postData);
      await newPost.save();
      console.log('The post was created successfully');
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  const getAllPosts = async () => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  module.exports = {
    Post,
    savePost,
    getAllPosts,
  };