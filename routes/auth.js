const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { login, register } = require("../controllers/authController");

// Create a router
const router = express.Router();

// Login user
router.post("/login", login);

// Register user
router.post("/register", register);

module.exports = router;
