const Note = require("../../src/models/note.js");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel" });
  }
};
