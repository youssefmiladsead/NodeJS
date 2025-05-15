const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

 dotenv.config();

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGO_URI;

mongoose.connect(DB)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });
