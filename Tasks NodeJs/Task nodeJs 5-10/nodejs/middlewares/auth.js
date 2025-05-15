const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    let token;

     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in!' });
    }

     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

     const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'The user no longer exists.' });
    }

     req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
