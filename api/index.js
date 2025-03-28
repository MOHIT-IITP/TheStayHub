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
const cloudinary = require("cloudinary").v2;


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST","PUT","DELETE"],
  }),
);

// All Router
app.use("/", AuthRouter);
app.use('/', ProfileRouter);
app.use('/',PlaceRouter);

mongoose.connect(process.env.MONGO_URL);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp');  // Use the writable /tmp directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const photosMiddleware = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  if (req.files && req.files.length > 0) {
    console.log("Files received:", req.files); // Debug log
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
      try {
        const result = await cloudinary.uploader.upload(path, {
          folder: "uploads",
        });
        uploadedFiles.push(result.secure_url);
        fs.unlinkSync(path); // Remove the local file after upload
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }
    }
    res.json(uploadedFiles);
  } else {
    res.status(400).json({ message: "No files uploaded" });
  }
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => console.log("Server is Running"));
