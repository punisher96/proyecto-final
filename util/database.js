const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistema_de_elecciones', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
    port: 3306
  
});

module.exports = sequelize;