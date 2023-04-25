const { userModel } = require("../models/user.model");

const registrationValidator = async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(401).send({msg:'Please provide name, email and password'});
    }

    if(password.length < 5){
        return res.status(411).send({msg:'Passsword should be of minimum 5 characters'})
    }

    let emailarray = email.split("");

    if(!emailarray.includes('@') || !emailarray.includes(".")){
        return res.status(406).send({msg:'Invalid Email'});
    }

    let user = await userModel.find({email});
    if(user.length){
        return res.status(409).send({msg:'Account already exists'});
    }

    next();
}

module.exports = {
    registrationValidator
}