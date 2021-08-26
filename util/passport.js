const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('./database')

passport.use('local.registro', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true

}, async(req, usuario, contrasena, done) => {
    const { nombre, apellido, email } = req.body;
    const newUser = {
        usuario,
        contrasena,
        nombre,
        apellido,
        email
    }

    await pool.query('INSERT INTO usuarios SET ?', [newUser])
}));

// passport.serializeUser((usr, done) => {

// });