const mongoose = require('mongoose');
// const config = require('config');

const db = process.env.MONGO_URI;
// process.env.MONGO_URI;
// config.get('MONGO_URI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Database Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
