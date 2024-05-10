const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userid: String,
  title: String,
  content: String,
  color: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
