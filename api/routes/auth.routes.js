const express = require("express");
const { handleRegister, handleLogin, handleLogout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", handleRegister)
router.post("/login",handleLogin)
router.post("/logout", handleLogout)

module.exports = router;