const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected to ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.log("DB error", error, colors.bgRed);
  }
};
module.exports = { connectDb };
