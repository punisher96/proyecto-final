const User = require('../models/usuariosModel');
const passport = require('passport');

exports.Login = function(req, res, next) {
    res.render("auth/login", { pageTitle: "Inicio" });
};

exports.PostLogin = function(req, res, next){
    res.render("auth/login")
    passport.authenticate('local.login', {
        successRedirect: 'auth/bienvenido',
        failureRedirect: 'auth/registro',
        failureFlash: true
    })(req, res, next);
}

exports.GetRegistro = function(req, res, next) {
    res.render("auth/registro", { pageTitle: "Inicio" });
};

// exports.PostRegistro = function(req, res, next) {
//     const nombre = req.body.nombre;
//     const apellido = req.body.apellido;
//     const email = req.body.email;
//     const usuario = req.body.usuario;
//     const contrasena = req.body.contrasena;
//     const errors = [];

//     User.create({
//         nombre: nombre,
//         apellido: apellido,
//         email: email,
//         usuario: usuario,
//         contrasena: contrasena,
        
//     }).then((result) => {
        
//         if (nombre.length <= 0) {
//             errors.push({ text: "Por favor ingresa tu nombre" });
//         }

//         // res.redirect("/login");
//     }).then((err) => {
//         console.log(err);
//     });
// };


exports.PostRegistro = async function(req, res, next) {
    const { nombre, apellido, email, usuario, contrasena, c_contrasena } = req.body;
    const errors = [];
    let emailUser = await User.findOne({email: email});
    //const user = await User.findOne({email});    

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
        res.render('auth/registro', {errors, nombre, apellido, email, usuario, contrasena, c_contrasena});        
    } else{

    // if(emailUser){            
    //     // res.redirect('/registro'); 
    //     res.send({email});    
    // } else {

            const newUser = new User({nombre, apellido, email, usuario, contrasena})
            await newUser.save()
            res.redirect('/login'); 

        // newUser.contrasena = await newUser.helpers.encryptPassword(contrasena)
    // }
    }
};

exports.GetBienvenido = function(req, res, next) {
    res.send('Hola');
}