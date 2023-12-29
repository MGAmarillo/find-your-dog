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

  const deletePost = async (post) => {
    try {
      await Post.deleteOne({ _id: post._id });
      return post;
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  const modifyPost = async(id, updatedData) => {
    try {
      await Post.updateOne({_id: id}, {$set:updatedData});
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

  module.exports = {
    Post,
    savePost,
    getAllPosts,
    deletePost,
    modifyPost,
  };