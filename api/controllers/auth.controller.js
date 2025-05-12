import User from "../models/User.js";
import bcrypt from "bcryptjs";
const bcryptSalt = bcrypt.genSaltSync(10);
import dotenv from "dotenv";
dotenv.config();
import { generateJwtToken } from "../utils/jwtVerify.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET;

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ message: "User not found Please Register First" });
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        generateJwtToken(userDoc,res);
    } else {
      res.status(422).json({ message: "Password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

 export const handleRegister = async( req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    generateJwtToken(userDoc, res);
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
}

export const handleLogout = async (req, res) => {
  res.cookie("token", "").json(true);
}

