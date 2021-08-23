//imports
const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars"); //Handlebars 
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");


//conecction
const sequelize = require("./util/database");


//models
const candidatosModel = require("./models/candidatosModel");
const ciudadanosModel = require("./models/ciudadanosModel");
const eleccionesModel = require("./models/eleccionesModel");
const partidosModel = require("./models/partidosModel");
const puestoElectivoModel = require("./models/puestoElectivoModel");
const usuariosModel = require("./models/usuariosModel");

//routes 
const Auth = require("./routes/auth");
const administradorRoute = require("./routes/administrador");
const Votantes = require("./routes/votantes");


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


// Para usar handlerbars 
app.engine("hbs", expressHbs({
    layoutsDir: 'views/layout/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
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

//relaciones


//sync
sequelize.sync( /*{force: true}*/ ).then((result) => {
    app.listen(1996);
}).catch((err) => {
    console.log(err);
});