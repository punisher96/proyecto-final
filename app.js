const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//conecction
const sequelize = require("./util/database");
//conecction

//models
const candidatosModel = require("./models/candidatosModel");
const ciudadanosModel = require("./models/ciudadanosModel");
const eleccionesModel = require("./models/eleccionesModel");
const partidosModel = require("./models/partidosModel");
const puestoElectivoModel = require("./models/puestoElectivoModel");
const usuariosModel = require("./models/usuariosModel");
//models

//routes
const indexRoute = require("./routes/index");
const votantesRoute = require("./routes/votantes");
const administradorRoute = require("./routes/administrador");
//routes

//controladores
const errorController = require("./controllers/errorController");
//controladores




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
//MULTER

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));



//middlewares
app.use(administradorRoute);
app.use(votantesRoute);
app.use(indexRoute);

app.use(errorController.get404);
//middlewares

//relaciones


//sync
sequelize.sync(/*{force: true}*/).then((result) => {
    app.listen(1996);
}).catch((err) => {
    console.log(err);
});

