const User = require("../models/User");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const mongoose = require("mongoose")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

const handleLogin = async (req, res) => {
  try {
    // Remove mongoose.connect from here; connect once in your app entry point
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ message: "User not found Please Register First" });
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtsecret,
        {},
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: "Token generation failed" });
          }
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json({ message: "Password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

 const handleRegister = async( req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
}

const handleLogout = async (req, res) => {
  res.cookie("token", "").json(true);
}

module.exports = { handleLogin, handleRegister, handleLogout };
