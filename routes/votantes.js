const express = require("express");
const router = express.Router();
const votantesController = require("../controllers/votantesController");

router.get("/", votantesController.Votar);
router.post("/Votante-Confirm", votantesController.postVotante);

// router.get("/CandidatosActivos", votantesController.ElegirCandidato);

router.get("/votacion-de-candidatos", votantesController.ElegirCandidato);
router.get("/votacion-de-partidos", votantesController.ElegirPartido);
module.exports = router;

//Probando merge