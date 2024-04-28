const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/todo-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
};
module.exports = { connect };
