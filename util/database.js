const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistema_de_elecciones', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    //Aqui lo tuve que cambiar a mi puerto
    port: 3301

});

module.exports = sequelize;