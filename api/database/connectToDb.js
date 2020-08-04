const mongoose = require("mongoose");
const config = require("config");

const mongoUri = config.get("mongoUri");

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log("Mongo db was connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;