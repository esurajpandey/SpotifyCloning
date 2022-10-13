const db = require('../../models/db');
const {User} = db;

exports.getUserByEmail = async (email) => {
    try{
      const user = await User.findOne({
                    where: {
                      userEmail: email,
                    }
                  });
        return user;
    }catch(err){
      throw new Error(err);
    }
}

exports.getUsers = (req,resp,next) =>{
    User.findAll()
    .then(users => {
        resp.json(users);
    })
    .catch(err =>{
        console.log(err);
    });
}