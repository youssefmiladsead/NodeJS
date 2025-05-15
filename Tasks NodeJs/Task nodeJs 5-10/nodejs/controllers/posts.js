const Post = require('../models/Post');

// GET /posts
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();

  const postsWithFlag = posts.map((post) => {
    return {
      ...post.toObject(),
      isMine: post.user.toString() === req.user._id.toString()
    };
  });

  res.status(200).json(postsWithFlag);
};

// GET /posts/:id
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const isMine = post.user.toString() === req.user._id.toString();

  res.status(200).json({ ...post.toObject(), isMine });
};

// POST /posts
exports.createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, user: req.user._id });
  res.status(201).json(post);
};

// PUT /posts/:id
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You are not allowed to edit this post' });
  }

  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updated);
};

// DELETE /posts/:id
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You are not allowed to delete this post' });
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
