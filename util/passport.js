const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('./database');
const helpers = require('./helpers/helpers')


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
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    console.log(result);

}));

// passport.serializeUser((usr, done) => {

// });