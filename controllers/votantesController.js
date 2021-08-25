const Ciudadano = require("../models/ciudadanosModel");

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


exports.ElegirCandidato = function(req, res, next) {
    res.render("votantes/mostrarCandidatos", {
        pageTitle: "Candidatos Activos"
    });
};