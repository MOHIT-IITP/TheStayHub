const User = require("../models/User");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const mongoose = require("mongoose")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = "23423@@#$2343@#$%@$";

const handleProfile = (req, res) =>{
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json("Invalid token");
      }
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.status(401).json("no token found");
  }
}

module.exports = {handleProfile}