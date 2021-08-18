const express = require("express");
const router = express.Router();
const votantesController = require("../controllers/votantesController");

router.get("/login", votantesController.getLogin);
router.get("/registro", votantesController.getRegistro);

module.exports = router;

//Probando merge