const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const restrictTo = require('../middlewares/restrictTo');

router.post('/signup', signup);
router.post('/login', login);

router.get('/', auth, restrictTo('admin'), async (req, res) => {
   res.send('admin admin');
});

module.exports = router;
