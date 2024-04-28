const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: "Användarnamnet får bara innehålla alfanumeriska tecken",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
          value
        );
      },
      message:
        "Lösenordet måste vara minst 8 tecken långt och innehålla minst en stor bokstav, en liten bokstav och en siffra",
    },
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
