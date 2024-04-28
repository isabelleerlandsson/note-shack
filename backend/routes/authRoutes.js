const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route för användarregistrering
router.post("/register", authController.registerUser);

router.delete("/users/:userId", authController.deleteUser);

router.get("/users", authController.getAllUsers);

router.post("/login", authController.loginUser);

module.exports = router;
