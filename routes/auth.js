const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const User = require("../models/usuariosModel")

router.get("/login", authController.Login);
router.get("/registro", authController.GetRegistro);

router.post("/registro", authController.PostRegistro);

module.exports = router;