const shopModel = require('../data/shops');

const saveShop = async (req, res) => {
    try {
      const { author, shopName, description, images, zone, validations } = req.body;
      const shopData = {author, shopName, description, images, zone, validations };
  
      const shops = await shopModel.getAllShops();
      const shopFounded = shops.find(shop => shop.zone === shopData.zone && shop.shopName === shopData.shopName);
  
      if(shopFounded){
        return res.status(404).json({ error: 'Este shop ya existe'});
      }
  
      await shopModel.saveShop(shopData,'shops');
  
      res.status(201).send('Negocio insertado correctamente');
    } catch (error) {
      console.error('Error en el controlador:', error.message);
      res.status(500).send('Error interno del servidor');
    }
  };

  const getAllShops = async (req, res) => {
    try {
      const shops = await shopModel.getAllShops();
      res.json(shops);
    } catch (error) {
      console.error('Error en el controlador:', error.message);
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  };

  const deleteShop = async (req, res) => {
    try {
      const { author, shopName } = req.params;
      const decodedAuthor = decodeURIComponent(author);
      const decodedShop = decodeURIComponent(shopName);
      
      // Asumiendo que getAllPosts es una función asíncrona
      const shops = await shopModel.getAllShops();
      const shopFound = shops.find(shop => shop.author === decodedAuthor && shop.shopName === decodedShop);
  
      if (!shopFound) {
        return res.status(404).json({ error: 'Negocio no encontrado' });
      }
  
      // Asegúrate de que deletePost retorna una Promise
      await shopModel.deleteShop(shopFound);
  
      res.json({ message: 'Negocio eliminado correctamente', deletedShop: shopFound });
    } catch (error) {
      console.error('Error en el controlador:', error.message);
  
      // Manejo adicional de errores, como verificar si res está definido antes de usarlo
      if (res) {
        res.status(500).json({ error: 'Error al eliminar el negocio' });
      }
    }
  };

  const modifyShop = async(req, res) => {
    try {
      const { author, shopName } = req.params;
      const decodedAuthor = decodeURIComponent(author);
      const decodedShop = decodeURIComponent(shopName);
      
      const shops = await shopModel.getAllShops();
      const shopFound = shops.find(shop => shop.author === decodedAuthor && shop.shopName === decodedShop);
  
      if (!shopFound) {
        return res.status(404).json({ error: 'Post no encontrado' });
      }
      
      const {newShopName, newDescription, newImages, newZone } = req.body;
      const shopData = { author, shopName:newShopName, description:newDescription, images:newImages, zone:newZone, validations:shopFound.validations};
      
      console.log(shopFound._id);
      console.log(shopData);
      await shopModel.modifyShop(shopFound._id,shopData);
  
      res.json({ message: 'Negocio modificado correctamente'});
  
    } catch (error) {
      console.error('Error en el controlador:', error.message);
  
      if (res) {
        res.status(500).json({ error: 'Error al eliminar el post' });
      }
    }
  };

  module.exports = {
    saveShop,
    getAllShops,
    deleteShop,
    modifyShop
  };