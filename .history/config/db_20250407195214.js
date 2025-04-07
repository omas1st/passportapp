// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Removed deprecated options; the new parser is used by default.
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
