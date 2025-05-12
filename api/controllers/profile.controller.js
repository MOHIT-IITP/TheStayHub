import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

const handleProfile = (req, res) =>{
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json("Invalid token");
      }
      // added user here so that we can check if the user is present or not 
      const user = await User.findById(userData.id);
      if (!user) {
        return res.status(404).json("User not found");
      }
      const { name, email, _id } = user;
      res.json({ name, email, _id });
    });
  } else {
    res.status(401).json("no token found");
  }
}

export { handleProfile };