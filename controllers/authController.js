const { UPSERT } = require("sequelize/types/lib/query-types");


exports.Login = function(req, res, next) {
    res.render("auth/login", { pageTitle: "Inicio" });
};

exports.GetRegistro = function(req, res, next) {
    res.render("auth/registro", { pageTitle: "Inicio" });
};


exports.PostRegistro = async function(req, res, next){
    const { nombre, apellido, email, usuario, password, c_password} = req.body
    const errors = [];
    console.log(req.body)

    if(nombre.length <= 0 ){
        errors.push({text: "Por favor ingresa tu nombre"})
    }
    if(password != c_password){
        errors.push({text: "Las contraseñas no coinciden"})
    }
    if(password.length < 5){
        errors.push({text: "La contraseña debe tener más de 4 dígitos"})
    }

    if(errors.length > 0){
        res.render('auth/registro', {errors, nombre, apellido, email, usuario, password, c_password});
    } else{
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash('error_msg', 'El correo ya está en uso');
            res.redirect('auth/registro');
        }
        const newUser = new User({nombre, apellido, email, usuario, password});
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save();
        req.flash('success_msg', 'Te has registrado');
        res.redirect('auth/login');
    }
    
}