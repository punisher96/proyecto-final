const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.Login);
router.get("/registro", authController.GetRegistro);
router.get("/bienvenido", authController.GetBienvenido);
router.post("/registro", authController.PostRegistro);

module.exports = router;