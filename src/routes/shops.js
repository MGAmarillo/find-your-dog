const express = require('express');
const shopsController = require('../controllers/shops');

const router = express.Router();

router.post('/', shopsController.saveShop);
router.get('/', shopsController.getAllShops);
router.delete('/:author/:shopName', shopsController.deleteShop);
router.put('/:author/:shopName', shopsController.modifyShop);

module.exports = router;