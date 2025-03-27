const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const AuthRouter = require("./routes/auth.routes.js");
const ProfileRouter = require('./routes/profile.routes.js')
const PlaceRouter = require("./routes/places.routes.js");


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // adjust this if needed
  }),
);

// All Router
app.use("/", AuthRouter);
app.use('/', ProfileRouter);
app.use('/',PlaceRouter);
app.use("/uploads", express.static(__dirname + "/uploads"));

// connecting to the mongodb server
mongoose.connect(process.env.MONGO_URL);

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.send("Uploaded: " + newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  if (req.files && req.files.length > 0) {
    console.log("Files received:", req.files); // Debug log
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  } else {
    res.status(400).json({ message: "No files uploaded" });
  }
});

app.listen(4000, (req, res) => console.log("Server is Running"));
