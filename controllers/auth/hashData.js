const bcrypt = require('bcrypt');

exports.getHashPassword = async(password) =>{
    try{
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);
        return hashPassword;
    }catch(err){
        return null;
    }
}