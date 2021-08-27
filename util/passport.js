const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../models/usuariosModel');
const prueb = require('./database').pool;
const helpers = require('./helpers');

passport.use('local.registro', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true

}, async (req, usuario, contrasena, done) => {
    const { nombre, apellido, email } = req.body;
    const newUser = {
        usuario,
        contrasena,
        nombre,
        apellido,
        email
    }
    console.log(req.body);
    newUser.contrasena = await helpers.encryptPassword(contrasena);
    const result = await prueb.query('INSERT INTO usuarios SET ?', [newUser]);
    console.log(result);

}));

passport.use('local.login', new LocalStrategy({

    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true,
}, async (req, usuario, contrasena, done) =>{

    console.log(req.body);
    const rows = await prueb.query('SELECT * FROM usuarios WHERE usuarios.usuario = ?', [usuario]);
    if (rows.length > 0){
        const user = rows[0];
        const validPassword = helpers.matchPassword(contrasena, user.contrasena);
        if(validPassword){
            done(null, user, req.render('/bienvenido'));
        }else{
            done(null, false, req.render('/Login'));
        }
    }else{
        return done(null, false, req.render('/register'));
    }

}
));


// passport.serializeUser((usr, done) => {

// });