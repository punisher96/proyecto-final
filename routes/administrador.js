const express = require("express");
const router = express.Router();
const administradorController = require("../controllers/administradorController");

router.get("/home", administradorController.getHome);
//PUESTOS ELECTIVOS
router.get("/puestos-electivos", administradorController.getPuestosElectivos);
router.get("/agregar-puesto", administradorController.getAgregarPuestoElectivo);
router.post("/agregar-puesto", administradorController.postAgregarPuestoElectivo);
router.get("/editar-puesto-electivo/:puestoId", administradorController.getEditarPuesto);
router.post("/editar-puesto-electivo", administradorController.postEditarPuesto);
router.post("/delete-puesto", administradorController.postDeletePuesto);
// //PUESTOS ELECTIVOS

//CIUDADANOS
router.get("/ciudadanos", administradorController.getCiudadanos);
router.get("/agregar-ciudadano", administradorController.getAgregarCiudadano);
router.post("/agregar-ciudadano", administradorController.postAgregarCiudadano);
router.get("/editar-ciudadano/:ciudadanoId", administradorController.getEditarCiudadano);
router.post("/editar-ciudadano", administradorController.postEditarCiudadano);
router.post("/delete-ciudadano", administradorController.postDeleteCiudadano);
//CIUDADANOS

// //PARTIDOS
router.get("/partidos", administradorController.getPartidos);
router.get("/agregar-partido", administradorController.getAgregarPartido);
router.post("/agregar-partido", administradorController.postAgregarPartido);
router.get("/editar-partido/:partidoId", administradorController.getEditarPartido);
router.post("/editar-partido", administradorController.postEditarPartido);
router.post("/delete-partido", administradorController.postDeletePartido);
// //PARTIDOS

//CANDIDATOS
router.get("/candidatos", administradorController.getCandidatos);
router.get("/agregar-candidato", administradorController.getAgregarCandidato);
router.post("/agregar-candidato", administradorController.postAgregarCandidato);
router.get("/editar-candidato/:candidatoId", administradorController.getEditarCandidato);
router.post("/editar-candidato", administradorController.postEditarCandidato);
router.post("/delete-candidato", administradorController.postDeleteCandidato);
//CANDIDATOS

//ELECCIONES
// router.get("/elecciones", administradorController.getElecciones);
// router.get("/agregarElecciones", administradorController.);

// router.post("/agregar-elecciones", administradorController.);
// router.get("/editar-elecciones/:eleccionId", administradorController.);
// router.post("/editar-elecciones", administradorController.);

// router.post("/delete-elecciones", administradorController.);
// //ELECCIONES

module.exports = router;