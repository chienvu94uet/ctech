// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It manages relationships between data, provides schema validation,
// and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected mongo successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connect;
