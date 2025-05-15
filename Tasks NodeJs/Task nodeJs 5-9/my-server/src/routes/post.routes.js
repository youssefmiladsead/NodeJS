const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Route to create a new post
router.post('/', createPost);

// Route to get all posts
router.get('/', getAllPosts);

// Route to get a post by ID
router.get('/:id', getPostById);

// Route to update a post by ID
router.patch('/:id', updatePost);

// Route to delete a post by ID
router.delete('/:id', deletePost);

module.exports = router;
