exports.Login = function(req, res, next) {
    res.render("auth/login", { pageTitle: "Inicio" });
};

exports.GetRegistro = function(req, res, next) {
    res.render("auth/registro", { pageTitle: "Inicio" });
};

exports.PostRegistro = function(req, res, next){
    const { nombre, apellido, email, usuario, contrasena, c_contrasena} = req.body
    const error = [];
    if(contrasena != c_contrasena){
        error.push({text: "Las contraseñas no coinciden"})
    }
    if(contrasena.length > 4){
        error.push({text: "La contraseña debe tener más de 4 dígitos"})
    }
    if(error.length > 0){
        res.render('registro', {error, nombre, apellido, email, usuario, contrasena, c_contrasena});
    } else{
        res.send("Nice")
    }
    
}