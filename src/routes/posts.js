const express = require('express');
const postsController = require('../controllers/posts');

const router = express.Router();

router.post('/', postsController.savePost);
router.get('/', postsController.getAllPosts);
router.delete('/:author/:dogName', postsController.deletePost);
router.put('/:author/:dogName', postsController.modifyPost);

module.exports = router;