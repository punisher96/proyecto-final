 const bcrypt = require('bcryptjs')
 const helpers = {};

 helpers.encryptPassword = async (contrasena) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);
    return hash;
 };


 helpers.matchPassword = async (contrasena, savedContrasena) => {
    try{
       return await bcrypt.compare(contrasena, savedContrasena);
    } catch(e) {
        console.log(e)
    }
 };

 module.exports = helpers;