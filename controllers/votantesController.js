const ciudadano = require("../models/ciudadanosModel");

exports.Votar = function(req, res, next) {

    ciudadano.findOne({ where: { documento_de_identidad: 1 } })
        .then((result) => {
            const cedula = req.body.documento_de_identidad;


            res.render("votantes/index", {
                pageTitle: "Inicio del Sistema",
                isAdded: true,
                homeActive: true,
                Mensaje: "Prueba de mensaje",

            });
        }).catch((err) => {
            console.log(err);
        });

};

exports.ConfirmarVotante = function(req, res, next) {
    const Cedula = req.body.documento_de_identidad;
    Votante.findOne({ where: { documento_de_identidad: Cedula } })
        .then((result) => {
            const votante = result.dataValues;
            Console.log(votante);
            // if (!votante) {

            //     return res.redirect("/");
            // }
            // console.log(votante);

            // res.render("votantes/MostrarCandidatos", {
            //     pageTitle: "Editando votante",
            //     votanteActive: true,
            //     votante: votante,
            // });

        }).catch((err) => {
            console.log(err);
        });

};


exports.ElegirCandidato = function(req, res, next) {
    res.render("votantes/mostrarCandidatos", {
        pageTitle: "Candidatos Activos"
    });
};