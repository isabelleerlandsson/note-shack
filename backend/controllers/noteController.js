const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const verify = promisify(jwt.verify);

const Note = require("../../src/models/note.js");

exports.createNote = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verify(token, "jwt_secret_key");
    const userId = decoded.userId;

    const { title, content } = req.body;
    const newNote = new Note({
      userid: userId,
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

exports.getAllNotes = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verify(token, "jwt_secret_key");
    const userId = decoded.userId;

    const notes = await Note.find({ userid: userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verify(token, "jwt_secret_key");
    const userId = decoded.userId;

    const noteId = req.params.noteId;

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      userid: userId,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Anteckning kunde inte hittas" });
    }

    res.status(200).json({ message: "Anteckning borttagen" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res
      .status(500)
      .json({ message: "Ett fel uppstod vid borttagning av anteckning" });
  }
};

exports.editNote = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verify(token, "jwt_secret_key");
    const userId = decoded.userId;

    const { title, content } = req.body;
    const noteId = req.params.noteId;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Anteckning kunde inte hittas" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error editing note:", error);
    res
      .status(500)
      .json({ message: "Ett fel uppstod vid redigering av anteckning" });
  }
};
