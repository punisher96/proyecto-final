const puestoElectivoModel = require("../models/puestoElectivoModel");
const ciudadanoModel = require("../models/ciudadanosModel");
const partidosModel = require("../models/partidosModel");
const candidatoModel = require("../models/candidatosModel");
const eleccionesModel = require("../models/eleccionesModel");

exports.getHome = function(req, res, next) {
    res.render("administrador/indexAdministrador", {
        pageTitle: "Administrador",
        inicioActive: true,
    });
};


//#region PUESTOS ELECTIVOS
exports.getPuestosElectivos = function(req, res, next) {

    puestoElectivoModel.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    }).then((result) => {

        const puestosElectivos = result.map((result) => result.dataValues);

        console.log(puestosElectivos);
        res.render("administrador/lista-de-puestos", {
            pageTitle: "Puestos Electivos",
            puestosElectivos: puestosElectivos,
            puestoActive: true,
        });

    }).catch(function(err) {
        console.log(err);
    });
};

exports.getAgregarPuestoElectivo = function(req, res, next) {
    res.render("administrador/lista-de-puestos-agregar", {
        pageTitle: "Agregar Puesto electivo",
        editMode: false,

    });
};

exports.postAgregarPuestoElectivo = function(req, res, next) {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;

    puestoElectivoModel.create({
        nombre: nombre,
        descripcion: descripcion
    }).then((result) => {
        res.redirect("/puestos-electivos");
    }).catch((err) => {
        console.log(err);
    });
};

exports.getEditarPuesto = (req, res, next) => {
    const edit = req.query.edit;
    const puestoId = req.params.puestoId;

    if (!edit) {
        return res.redirect("/puestos-electivos");
    }

    puestoElectivoModel.findOne({ where: { id: puestoId } }).then((result) => {
        const puesto = result.dataValues;
        if (!puesto) {
            return res.redirect("/puestos-electivos");
        }
        res.render("administrador/lista-de-puestos-agregar", {
            pageTitle: "Editar puesto electivo",
            editMode: edit,
            puesto: puesto
        });

    }).catch((err) => {
        console.log(err);
    });
};

exports.postEditarPuesto = (req, res, next) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;
    const puestoId = req.body.puestoId;

    puestoElectivoModel.update({
            nombre: nombre,
            descripcion: descripcion,
            estado: estado
        }, {
            where: { id: puestoId }
        }

    ).then((result) => {
        return res.redirect("/puestos-electivos");
    }).catch((err) => {
        console.log(err);
    });


};

exports.postDeletePuesto = (req, res, next) => {
    const puestoId = req.body.puestoId;
    puestoElectivoModel.destroy({ where: { id: puestoId } }).then((result) => {
        return res.redirect("/puestos-electivos");
    }).catch((err) => {
        console.log(err);
    });


};
//#endregion PUESTOS ELECTIVOS

//#region CIUDADANOS


exports.getCiudadanos = function(req, res, next) {

    ciudadanoModel.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    }).then((result) => {

        const ciudadanos = result.map((result) => result.dataValues);

        console.log(ciudadanos);
        res.render("administrador/ciudadanosLista", {
            pageTitle: "Lista de Ciudadanos",
            ciudadanos: ciudadanos,
            ciudadanoActive: true,
        });

    }).catch(function(err) {
        console.log(err);
    });
};

exports.getAgregarCiudadano = function(req, res, next) {
    res.render("administrador/ciudadanos-agregar", {
        pageTitle: "Agregar Ciudadano",
        editMode: false
    });
};

exports.postAgregarCiudadano = function(req, res, next) {
    const documento = req.body.documento;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;

    ciudadanoModel.create({
        documento_de_identidad: documento,
        nombre: nombre,
        apellido: apellido,
        email: email,
    }).then((result) => {
        res.redirect("/ciudadanos");
    }).catch((err) => {
        console.log(err);
    });
};

exports.getEditarCiudadano = (req, res, next) => {
    const edit = req.query.edit;
    const ciudadanoId = req.params.ciudadanoId;

    if (!edit) {
        return res.redirect("/ciudadanos");
    }

    ciudadanoModel.findOne({ where: { id: ciudadanoId } }).then((result) => {
        const ciudadano = result.dataValues;
        if (!ciudadano) {
            return res.redirect("/ciudadanos");
        }
        res.render("administrador/ciudadanos-agregar", {
            pageTitle: "Editar ciudadano",
            editMode: edit,
            ciudadano: ciudadano
        });

    }).catch((err) => {
        console.log(err);
    });
};

exports.postEditarCiudadano = (req, res, next) => {
    const documento = req.body.documento;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const estado = req.body.estado;
    const ciudadanoId = req.body.ciudadanoId;

    ciudadanoModel.update({
            documento_de_identidad: documento,
            nombre: nombre,
            apellido: apellido,
            email: email,
            estado: estado
        }, {
            where: { id: ciudadanoId }
        }

    ).then((result) => {
        return res.redirect("/ciudadanos");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postDeleteCiudadano = (req, res, next) => {
    const ciudadanoId = req.body.ciudadanoId;
    ciudadanoModel.destroy({ where: { id: ciudadanoId } }).then((result) => {
        return res.redirect("/ciudadanos");
    }).catch((err) => {
        console.log(err);
    });


};

//#endregion CIUDADANOS

//#region PARTIDOS

exports.getPartidos = function(req, res, next) {

    partidosModel.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    }).then((result) => {

        const partidos = result.map((result) => result.dataValues);

        console.log(partidos);
        res.render("administrador/partidos-lista", {
            pageTitle: "Partidos",
            partidos: partidos,
            partidosActive: true,
        });

    }).catch(function(err) {
        console.log(err);
    });
};

exports.getAgregarPartido = function(req, res, next) {
    res.render("administrador/partidos-agregar", {
        pageTitle: "Agregar Partido",
        editMode: false,
        partidosActive: true,
    });
};

exports.postAgregarPartido = function(req, res, next) {
    const nombre = req.body.nombre;
    const logo = req.file;
    const descripcion = req.body.descripcion;

    partidosModel.create({
        nombre: nombre,
        logo: "/" + logo.path,
        descripcion: descripcion
    }).then((result) => {
        res.redirect("/partidos");
    }).catch((err) => {
        console.log(err);
    });
};

exports.getEditarPartido = (req, res, next) => {
    const edit = req.query.edit;
    const partidoId = req.params.partidoId;

    if (!edit) {
        return res.redirect("/partidos");
    }

    partidosModel.findOne({ where: { id: partidoId } }).then((result) => {
        const partido = result.dataValues;
        if (!partido) {
            return res.redirect("/partidos");
        }
        res.render("administrador/partidos-agregar", {
            pageTitle: "Editar partido electivo",
            editMode: edit,
            partido: partido,
            partidosActive: true,
        });

    }).catch((err) => {
        console.log(err);
    });
};

exports.postEditarPartido = (req, res, next) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;
    const partidoId = req.body.partidoId;
    const logo = req.file;

    partidosModel.findOne({ where: { id: partidoId } }).then((result) => {

        const partido = result.dataValues;

        if (!partido) {
            return res.redirect("/partidos");
        }

        const imagePath = logo ? "/" + logo.path : partido.logo;

        partidosModel.update({
                nombre: nombre,
                descripcion: descripcion,
                estado: estado,
                partidosActive: true,
                logo: imagePath
            }, {
                where: { id: partidoId }
            }

        ).then((result) => {
            return res.redirect("/partidos");
        });
    }).catch((err) => {
        console.log(err);
    });

};

exports.postDeletePartido = (req, res, next) => {
    const partidoId = req.body.partidoId;
    partidosModel.destroy({ where: { id: partidoId } }).then((result) => {
        return res.redirect("/partidos");
    }).catch((err) => {
        console.log(err);
    });


};
//#endregion PARTIDOS

//#region CANDIDATOS

exports.getCandidatos = function(req, res, next) {

    candidatoModel.findAll({ include: [{ model: partidosModel }, { model: puestoElectivoModel }] })
        .then((candi) => {
            partidosModel.findAll({ where: { estado: true } })
                .then((parti) => {
                    puestoElectivoModel.findAll({ where: { estado: true } })
                        .then((pues) => {
                            const candidatos = candi.map((result) => result.dataValues);
                            const partidos = parti.map((result) => result.dataValues);
                            const puestos = pues.map((result) => result.dataValues);
                            // console.log(candidatos);
                            // console.log("-----------------------------");
                            // console.log(partidos);
                            // console.log("-----------------------------");
                            // console.log(puestos);
                            res.render("administrador/candidatos-lista", {
                                pageTitle: "Candidatos",
                                candidatos: candidatos,
                                candidatosActive: true,
                                partidosAny: partidos.length > 0,
                                puestoElectivoAny: puestos.length > 0,
                            });
                        });
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getAgregarCandidato = function(req, res, next) {

    partidosModel.findAll({ where: { estado: true } })
        .then((parti) => {
            puestoElectivoModel.findAll({ where: { estado: true } })
                .then((pues) => {
                    const partidos = parti.map((result) => result.dataValues);
                    const puestos = pues.map((result) => result.dataValues);

                    res.render("administrador/candidatos-agregar", {
                        pageTitle: "Agregar Candidato",
                        candidatosActive: true,
                        partido: partidos,
                        puesto: puestos,
                        editMode: false,
                        partidosAny: partidos.length > 0,
                        puestoElectivoAny: puestos.length > 0,
                    });
                }).catch(error => {
                    console.log(error);
                });
        }).catch(error => {
            console.log(error);
        });
};

exports.postAgregarCandidato = function(req, res, next) {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const candiPartido = req.body.Partido;
    const candiPuesto = req.body.PuestoElectivo;
    const foto = req.file;

    candidatoModel.create({
        nombre: nombre,
        apellido: apellido,
        foto: "/" + foto.path,
        partidoId: candiPartido,
        puestoElectivoId: candiPuesto,
    }).then((result) => {
        res.redirect("/candidatos");
    }).catch((err) => {
        console.log(err);
    });
};

exports.getEditarCandidato = (req, res, next) => {
    const edit = req.query.edit;
    const candidatoId = req.params.candidatoId;

    if (!edit) {
        return res.redirect("/candidatos");
    }

    candidatoModel.findOne({ where: { id: candidatoId } }).then((result) => {
        const candidato = result.dataValues;
        if (!candidato) {
            return res.redirect("/partidos");
        }

        Promise.all([partidosModel.findAll(), puestoElectivoModel.findAll()]).then(data => {
            const partido = data[0].map((result) => result.dataValues);
            const puesto = data[1].map((result) => result.dataValues);
            res.render("administrador/candidatos-agregar", {
                pageTitle: "Editar candidato",
                editMode: edit,
                partido: partido,
                candidatosActive: true,
                puesto: puesto,
                candidato: candidato,
            });
        }).catch(error => {
            console.log(error);
        });



    }).catch((err) => {
        console.log(err);
    });
};

exports.postEditarCandidato = (req, res, next) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const candiPartido = req.body.Partido;
    const candiPuesto = req.body.PuestoElectivo;
    const foto = req.file;
    const estado = req.body.estado;
    const candidatoId = req.body.candidatoId;

    candidatoModel.findOne({ where: { id: candidatoId } }).then((result) => {

        const candidato = result.dataValues;

        if (!candidato) {
            return res.redirect("/candidatos");
        }

        const imagePath = foto ? "/" + foto.path : candidato.foto;

        candidatoModel.update({
                nombre: nombre,
                apellido: apellido,
                estado: estado,
                foto: imagePath,
                partidoId: candiPartido,
                puestoElectivoId: candiPuesto,
            }, {
                where: { id: candidatoId }
            }

        ).then((result) => {
            return res.redirect("/candidatos");
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });

};

exports.postDeleteCandidato = (req, res, next) => {
    const candidatoId = req.body.candidatoId;
    candidatoModel.destroy({ where: { id: candidatoId } }).then((result) => {
        return res.redirect("/candidatos");
    }).catch((err) => {
        console.log(err);
    });


};
//#endregion CANDIDATOS

//#region ELECCIONES

exports.getElecciones = function(req, res, next) {

    eleccionesModel.findAll()
        .then((elecio) => {
            candidatoModel.findAll({ where: { estado: true } })
                .then((candi) => {
                    eleccionesModel.findAll({ where: { estado: true } })
                        .then((elecioActivas) => {
                            const eleccones = elecio.map((result) => result.dataValues);
                            const candidatos = candi.map((result) => result.dataValues);
                            const elecionActive = elecioActivas.map((result) => result.dataValues);

                            res.render("administrador/elecciones/elecciones-lista", {
                                pageTitle: "Candidatos",
                                eleccionesActive: true,
                                hasEleccionActive: elecionActive.length > 1,
                                candidat2sActivos: candidatos.length > 1,
                                elecionActive: elecionActive.length > 0,
                                eleccones: eleccones,
                                hayElecciones: eleccones.length > 0,
                            });
                        }).catch(function(err) {
                            console.log(err);
                        });
                }).catch(function(err) {
                    console.log(err);
                });
        }).catch(function(err) {
            console.log(err);
        });
};

exports.getAgregarElecciones = function(req, res, next) {
    candidatoModel.findAll({ where: { estado: true } })
        .then((candi) => {
            const candidatos = candi.map((result) => result.dataValues);

            res.render("administrador/elecciones/elecciones-agregar", {
                pageTitle: "Agregar elecciones",
                editMode: false,
                eleccionesActive: true,
                candidat2sActivos: candidatos.length > 1
            });
        }).catch(function(err) {
            console.log(err);
        });
};

exports.postAgregarElecciones = function(req, res, next) {
    const nombre = req.body.nombre;
    const fecha = req.body.fechaRealización;

    eleccionesModel.create({
        nombre: nombre,
        fecha: fecha,

    }).then((result) => {
        res.redirect("/elecciones");
    }).catch((err) => {
        console.log(err);
    });
};

exports.getEditarElecciones = (req, res, next) => {
    const edit = req.query.edit;
    const eleccionId = req.params.eleccionId;

    if (!edit) {
        return res.redirect("/candidatos");
    }

    eleccionesModel.findOne({ where: { id: eleccionId } }).then((result) => {
        const elecciones = result.dataValues;
        if (!elecciones) {
            return res.redirect("/elecciones");
        }
        res.render("administrador/elecciones/elecciones-agregar", {
            pageTitle: "Editar candidato",
            eleccionesActive: true,
            editMode: edit,
            elecciones: elecciones
        });

    }).catch((err) => {
        console.log(err);
    });
};

exports.postEditarElecciones = (req, res, next) => {
    const nombre = req.body.nombre;
    const fecha = req.body.fechaRealización;
    const estado = req.body.estado;
    const eleccionId = req.body.eleccionId;

    eleccionesModel.findOne({ where: { id: eleccionId } }).then((result) => {

        const elecciones = result.dataValues;

        if (!elecciones) {
            return res.redirect("/elecciones");
        }
        eleccionesModel.update({
                nombre: nombre,
                fecha: fecha,
                estado: estado,
            }, {
                where: { id: eleccionId }
            }

        ).then((result) => {
            return res.redirect("/elecciones");
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });

};

exports.postDeleteElecciones = (req, res, next) => {
    const eleccionId = req.body.eleccionId;
    eleccionesModel.destroy({ where: { id: eleccionId } }).then((result) => {
        return res.redirect("/elecciones");
    }).catch((err) => {
        console.log(err);
    });
};
// //ELECCIONES