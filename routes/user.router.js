const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registrationValidator } = require('../middlewares/registration.validator');
const { userModel } = require('../models/user.model');
const { loginValidator } = require('../middlewares/login.validator');
const { flightModel } = require('../models/flight.model');
const { idValidator } = require('../middlewares/id.validator');
const saltRounds = process.env.saltRounds;

const userRouter = express.Router();

userRouter.post('/register',registrationValidator,async (req, res) => {
    const {name, email, password} = req.body;
    const hash = await bcrypt.hash(password,+saltRounds);
    console.log(hash);
    const payload = {
        name, email, password:hash
    }
    const user = new userModel(payload);
    await user.save();
    res.status(201).send({msg:'User registration successful'});
})

userRouter.post('/login',loginValidator,async (req, res) => {
    const {email, password} = req.body;
    const [user] = await userModel.find({email});
    const payload = {
        email: user.email,
        name: user.name,
        password: user.password,
        id: user._id
    }
    bcrypt.compare(password,user.password,(error, same) => {
        if(error){
            console.log(error);
            res.status(500).send({msg: 'Something went wrong, please try again'});
        }
        else if(same){
            const token = jwt.sign(payload,process.env.key);
            res.status(201).send({msg:'Login Successful', token});
        }
        else{
            res.status(401).send({msg:'Password do not match'});
        }
    });
})

module.exports = {
    userRouter
}