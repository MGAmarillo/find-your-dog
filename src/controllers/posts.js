const postModel = require('../data/posts');

const savePost = async (req, res) => {
  try {
    const { author, dogName, description, images, likes, comments, zone } = req.body;
    const postData = { author, dogName, description, images, likes, comments, zone };

    const posts = await postModel.getAllPosts();
    const postFounded = posts.find(post => post.author === postData.author && post.dogName === postData.dogName);

    if(postFounded){
      return res.status(404).json({ error: 'Este post ya existe'});
    }

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

const deletePost = async (req, res) => {
  try {
    const { author, dogName } = req.params;
    const decodedAuthor = decodeURIComponent(author);
    const decodedDog = decodeURIComponent(dogName);
    
    // Asumiendo que getAllPosts es una función asíncrona
    const posts = await postModel.getAllPosts();
    const postFound = posts.find(post => post.author === decodedAuthor && post.dogName === decodedDog);

    if (!postFound) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Asegúrate de que deletePost retorna una Promise
    await postModel.deletePost(postFound);

    res.json({ message: 'Post eliminado correctamente', deletedPost: postFound });
  } catch (error) {
    console.error('Error en el controlador:', error.message);

    // Manejo adicional de errores, como verificar si res está definido antes de usarlo
    if (res) {
      res.status(500).json({ error: 'Error al eliminar el post' });
    }
  }
};

const modifyPost = async(req, res) => {
  try {
    const { author, dogName } = req.params;
    const decodedAuthor = decodeURIComponent(author);
    const decodedDog = decodeURIComponent(dogName);
    
    const posts = await postModel.getAllPosts();
    const postFound = posts.find(post => post.author === decodedAuthor && post.dogName === decodedDog);

    if (!postFound) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    const {newDogName, newDescription, newImages, newZone } = req.body;
    const postData = { author, dogName:newDogName, description:newDescription, images:newImages, likes:postFound.likes, comments:postFound.comments, zone:newZone};
    
    console.log(postFound._id);
    console.log(postData);
    await postModel.modifyPost(postFound._id,postData);

    res.json({ message: 'Post modificado correctamente'});

  } catch (error) {
    console.error('Error en el controlador:', error.message);

    if (res) {
      res.status(500).json({ error: 'Error al eliminar el post' });
    }
  }
};

module.exports = {
    savePost,
    getAllPosts,
    deletePost,
    modifyPost,
  };