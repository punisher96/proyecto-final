const Sequelize = require('sequelize');

const sequelize = require("../util/database");

const candidatos = sequelize.define("candidatos", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // partido_al_que_pertenece: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // puesto_al_que_aspira: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    foto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
});

module.exports = candidatos;