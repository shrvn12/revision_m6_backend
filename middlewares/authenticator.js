const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticator = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        res.status(401).send({msg:'You are not logged in!'});
    }
    jwt.verify(token,process.env.key,(err,decoded) => {
        if(decoded){
            req.body.user = decoded;
            next();
        }
        else{
            res.status(401).send({msg:'Access Denied!'});
        }
    });
}

module.exports = {
    authenticator
}