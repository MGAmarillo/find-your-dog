const postModel = require('../data/posts');

const savePost = async (req, res) => {
  try {
    const { author, dogName, description, images, likes, comments, zone } = req.body;
    const postData = { author, dogName, description, images, likes, comments, zone };

    await postModel.savePost(postData,'posts');

    res.status(201).send('Perro insertado correctamente');
  } catch (error) {
    console.error('Error en el controlador:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error en el controlador:', error.message);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

module.exports = {
    savePost,
    getAllPosts,
  };