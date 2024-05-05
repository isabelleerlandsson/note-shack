const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user.js");

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Användaren har tagits bort" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel" });
  }
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Användarnamnet finns redan" });
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "Användaren har registrerats" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: "Användaren hittades inte" });
    }
    const token = jwt.sign({ userId: user._id }, "jwt_secret_key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel" });
  }
};
