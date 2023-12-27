const express = require('express');
const postsController = require('../controllers/posts');

const router = express.Router();

router.post('/', postsController.savePost);
router.get('/', postsController.getAllPosts);

module.exports = router;