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
  try {
    res.status(200).json({ message: "Användaren har registrerats" });
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
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Användaren hittades inte" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Fel lösenord" });
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
