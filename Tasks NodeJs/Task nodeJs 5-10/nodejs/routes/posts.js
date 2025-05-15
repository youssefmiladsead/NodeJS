const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');

router.use(auth);  

router.route('/')
  .get(getAllPosts)
  .post(createPost);

router.route('/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
