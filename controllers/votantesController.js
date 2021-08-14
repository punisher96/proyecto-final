

exports.getLogin = function (req, res, next) {
    res.render("votantes/login", { pageTitle: "Inicio de sesion" });
};

exports.getRegistro = function (req, res, next) {
    res.render("votantes/registro", { pageTitle: "Registro" });
};