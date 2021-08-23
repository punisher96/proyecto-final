const express = require("express");
const router = express.Router();
const votantesController = require("../controllers/votantesController");

router.get("/", votantesController.Votar);
// router.post("/Votante-Confirm", ConfirmarVotante.ConfirmarVotante);

// router.get("/CandidatosActivos", votantesController.ElegirCandidato);

module.exports = router;

//Probando merge