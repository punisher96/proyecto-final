const User = require('../models/usuariosModel')
const helpelrs = require('../util/helpers/helpers')
exports.Login = function(req, res, next) {
    res.render("auth/login", { pageTitle: "Inicio" });
};

exports.GetRegistro = function(req, res, next) {
    res.render("auth/registro", { pageTitle: "Inicio" });
};




const passport = require('passport'); //Para utilizar el módulo passport SG

exports.PostRegistro = async function(req, res, next) {
    const { nombre, apellido, email, usuario, contrasena, c_contrasena } = req.body;
    const errors = [];

    // console.log(req.body);

    if (nombre.length <= 0) {
        errors.push({ text: "Por favor ingresa tu nombre" });
    }
    if (contrasena != c_contrasena) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }
    if (contrasena.length < 5) {
        errors.push({ text: "La contraseña debe tener más de 4 dígitos" });
    }

    if (errors.length > 0) {
        res.render('auth/registro', { errors, nombre, apellido, email, usuario, contrasena, c_contrasena });
        
    } else {

        const emailUser = await User.findOne({email: email});
        if(emailUser == true){
            res.redirect('/registro');           
        }

        const newUser = new User({nombre, apellido, email, usuario, contrasena})
            await newUser.save()    
            res.redirect('/login');
               
        // newUser.contrasena = await newUser.helpers.encryptPassword(contrasena)
    }  
};

exports.GetBienvenido = function(req, res, next) {
    res.send('Hola');
}