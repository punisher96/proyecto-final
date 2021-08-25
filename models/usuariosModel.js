const bcrypt = require('bcryptjs')

const Sequelize  = require('sequelize');

const sequelize = require("../util/database");

const usuarios = sequelize.define("usuarios", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre_de_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});


// usuarios.methods.encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = bcrypt.hash(password, salt);
//     return hash;
// };
// usuarios.methods.matchPassword = async function(password){
//     return await bcrypt.compare(password, this.password);
// };

module.exports = usuarios;
