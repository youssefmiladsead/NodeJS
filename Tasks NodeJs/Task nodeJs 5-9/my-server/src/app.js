const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const postRoutes = require('./routes/post.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/posts', postRoutes);

module.exports = app;
