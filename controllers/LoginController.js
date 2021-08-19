exports.getIndex = function(req, res, next) {
    res.render("votantes/index", { pageTitle: "Inicio" });
};