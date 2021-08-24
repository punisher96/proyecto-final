exports.Login = function(req, res, next) {
    res.render("auth/login", { pageTitle: "Inicio" });
};

exports.GetRegistro = function(req, res, next) {
    res.render("auth/registro", { pageTitle: "Inicio" });
};

exports.PostRegistro = function(req, res, next){
    console.log(req.body)
    res.send("Nice")
}