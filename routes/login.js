const express = require("express");
const router = express.Router();
const votantesController = require("../controllers/LoginController");

router.get("/login", votantesController.getIndex);
// router.get("/registro", votantesController.getRegistro);

module.exports = router;