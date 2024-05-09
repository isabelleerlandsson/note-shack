const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

const db = require("../src/db.js");
db.connect();

const authRoutes = require("../backend/routes/authRoutes.js");
app.use("/auth", authRoutes);

mongoose.connect("mongodb://localhost/todo-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const noteRoutes = require("../backend/routes/noteRoutes.js");
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
