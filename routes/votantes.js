const express = require("express");
const router = express.Router();
const votantesController = require("../controllers/votantesController");

router.get("/", votantesController.Votar);
router.post("/RegistrarVotante", votantesController.IniciarVoto);

router.get("/CandidatosActivos", votantesController.ElegirCandidato);

module.exports = router;