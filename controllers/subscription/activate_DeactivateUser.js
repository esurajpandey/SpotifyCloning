const { User } = require('../../models/db');
exports.activateUser = async(id) =>{
    try{
        const user = await User.findByPk(id);
        user.isPremium = true;
        return await user.save();
    }catch(err){
        throw new Error(err);
    }
}

exports.deactivateUser = async (id) => {
    try{
        const user = await User.findByPk(id);
        user.isPremium = false;
        return await user.save();
    }catch(err){
        throw new Error(err);
    }
}
