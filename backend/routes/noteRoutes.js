const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.post("/", noteController.createNote);

router.get("/", noteController.getAllNotes);

router.delete("/", noteController.deleteNote);

module.exports = router;
