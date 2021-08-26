const candidato = require("../models/candidatosModel");

const partido = require("../models/partidosModel");

const Ciudadano = require("../models/ciudadanosModel");

const puestos = require("../models/puestoElectivoModel");

exports.Votar = function(req, res, next) {

    res.render("votantes/index", {
        pageTitle: "Inicio del Sistema",
        isAdded: true,
        homeActive: true,
        Mensaje: "Prueba de mensaje",
    });
};

exports.postVotante = function(req, res, next) {
    const Cedula = req.body.documento_de_identidad;
    const errors = [];

    Ciudadano.findOne({
            where: {
                documento_de_identidad: Cedula,
            }
        })
        .then((result) => {

            if (result != null) {
                const ciudadano = result.dataValues;
                console.log(result);
                console.log("--------");
                if (ciudadano.estado == true) {
                    errors.push({ text: "ciudadano activo" });
                    res.render("votantes/index", {
                        pageTitle: "Editando votante",
                        votanteActive: true,
                        errors,
                    });
                }
            } else {
                errors.push({ text: "No existe este documento de Identidad" });
                res.render("votantes/index", {
                    pageTitle: "Editando votante",
                    votanteActive: true,
                    errors,
                });
            }

        }).catch((err) => {
            console.log(err);
        });

};


exports.ElegirCandidato = function (req, res, next) {
    
    candidato.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    }).then((result) => {

        const candidatos = result.map((result) => result.dataValues);

        console.log(candidatos);
        res.render("votantes/votarCandidatos", {
        pageTitle: "Candidatos Activos",
        candidatos: candidatos
    });

    }).catch(function(err) {
        console.log(err);
    });

    
};

exports.getOpcionesVotacion = function(req, res, next) {

    puestos.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    }).then((result) => {

        const puestos = result.map((result) => result.dataValues);

        console.log(puestos);
        res.render("votantes/pantallaVotacion", {
            pageTitle: "Votacion de Puestos Electivos",
            puestosElectivos: puestos,
            puestoActive: true,
        });

    }).catch(function(err) {
        console.log(err);
    });
};