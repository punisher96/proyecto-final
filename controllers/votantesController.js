const Ciudadano = require("../models/ciudadanosModel");


exports.Votar = function(req, res, next) {

    res.render("votantes/index", {
        pageTitle: "Inicio del Sistema",
        isAdded: true,
    });
};

exports.IniciarVoto = function(req, res, next) {
    // const Votante = req.params.IdAutor;
    // Ciudadano.findOne({ where: { documento_de_identidad: Votante } })
    //     .then((result) => {
    //         const autor = result.dataValues;

    //         if (!autor) {
    //             return res.redirect("/");
    //         }
    //         console.log(autor);

    //         res.render("autor/AgregarAutor", {
    //             pageTitle: "Editando autor",
    //             AutorActive: true,
    //             editMode: edit,
    //             autor: autor,
    //         });

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });


    // if(){
    res.render("votantes/MostrarCandidatos", {
        pageTitle: "Candidatos Activos"
    });
    // }else{

    // }
};


exports.ElegirCandidato = function(req, res, next) {
    res.render("votantes/mostrarCandidatos", {
        pageTitle: "Candidatos Activos"
    });
};