const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.post("/", noteController.createNote);

router.get(
  "/notes",
  authController.authenticateUser,
  noteController.getAllNotes
);

module.exports = router;
