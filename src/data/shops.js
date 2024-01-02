const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  author: String,
  shopName: String,
  description: String,
  images: [],
  zone: String,
  validations: Number,
});

const Shop = mongoose.model('Shop', shopSchema, 'shops');

const saveShop = async (shopData) => {
    try {
      const newShop = new Shop(shopData);
      await newShop.save();
      console.log('The shop was created successfully');
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

const getAllShops = async () => {
    try {
      const shops = await Shop.find();
      return shops;
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  const deleteShop = async (shop) => {
    try {
      await Shop.deleteOne({ _id: shop._id });
      return shop;
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  const modifyShop = async(id, updatedData) => {
    try {
      await Shop.updateOne({_id: id}, {$set:updatedData});
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

  module.exports = {
    Shop,
    saveShop,
    getAllShops,
    deleteShop,
    modifyShop
  };