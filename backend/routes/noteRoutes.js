const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.post("/", noteController.createNote);

router.get("/", noteController.getAllNotes);

router.delete("/:noteId", noteController.deleteNote);

router.put("/:noteId", noteController.editNote);

module.exports = router;
