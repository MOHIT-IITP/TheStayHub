const express = require("express");
const { handleProfile } = require("../controllers/profile.controller");
const router = express.Router();

router.get('/profile', handleProfile);

module.exports = router;