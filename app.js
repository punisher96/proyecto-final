//imports
const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars"); //Handlebars 
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const passport = require('passport'); //Para las sesiones SG
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

//conecction
const sequelize = require("./util/database");


//models
const candidatosModel = require("./models/candidatosModel");
const ciudadanosModel = require("./models/ciudadanosModel");
const eleccionesModel = require("./models/eleccionesModel");
const partidosModel = require("./models/partidosModel");
const puestoElectivoModel = require("./models/puestoElectivoModel");
const usuariosModel = require("./models/usuariosModel");

//Variables globales



//routes 
const Auth = require("./routes/auth");
const administradorRoute = require("./routes/administrador");
const Votantes = require("./routes/votantes");


require('./util/passport');

//controladores
const errorController = require("./controllers/errorController");


app.use(express.urlencoded({ extended: false }));


//MULTER
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
    }
});
app.use(multer({ storage: fileStorage }).single("ImagePath"));


const compareHelpers = require("./util/helpers/hbs/compare");

// Para usar handlerbars 
app.engine("hbs", expressHbs({
    layoutsDir: 'views/layout/',
    defaultLayout: 'main-layout',
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: {
        equalValue: compareHelpers.EqualValue,
    },
}));
app.set("view engine", "hbs");
app.set("views", "views");


//Poner la carperta estatica
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));



//middlewares 
app.use(administradorRoute);
app.use(Auth);
app.use(Votantes);

app.use(errorController.get404);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(methodOverride('_method'));





//relaciones
candidatosModel.belongsTo(partidosModel, { constraint: true, onDelete: "CASCADE" });
partidosModel.hasMany(candidatosModel);

candidatosModel.belongsTo(puestoElectivoModel, { constraint: true, onDelete: "CASCADE" });
puestoElectivoModel.hasMany(candidatosModel);

//sync
sequelize.sync( /*{ force: true }*/ ).then((result) => {
    app.listen(1996);
}).catch((err) => {
    console.log(err);
});