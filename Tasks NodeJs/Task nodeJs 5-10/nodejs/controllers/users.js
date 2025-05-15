const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm, role } = req.body;

    if (!password || !passwordConfirm) {
      return res.status(400).json({ message: 'Password and confirmation required' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const user = await User.create({
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    next(err);
  }
};



const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate token
    const token = await promisify(jwt.sign)(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
