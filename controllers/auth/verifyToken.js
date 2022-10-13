require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req,resp,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if(token == null){
        return resp.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if(err) {
            return resp.send();
        }
        req.userId = decoded.userId;
        // console.log(`In verify token ${req.userId}`);
        next();
    });
}