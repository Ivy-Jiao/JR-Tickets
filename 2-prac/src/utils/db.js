const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('DB connected');
  } catch(e) {
    logger.error('DB connection failed', {err});
    //none 0 exit code means error exit
    process.exit(1);
  }
}

module.exports = connectDB;