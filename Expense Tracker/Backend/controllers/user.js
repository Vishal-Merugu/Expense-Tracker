const User = require('../models/user');

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const jwtSecretKey = "8TVCOrH3u_tfvcOl6sNVK_g_2AjwyvAkkq4bDD6xmSc"

exports.postSignUp = async (req,res,next) => {
    try{
        const { name, email, phone, password } = req.body
        const users = await User.findAll({where : { email : email }})
        const user = users[0]
        console.log(user);
        if(user){
            res.status(404).json({message : "User Already Exists !!"})
        }
        else{
            bcrypt.hash(password,saltRounds,async (err,hash) => {
                 const user = await User.create({
                    name : name,
                    email : email,
                    phone : phone,
                    password : hash
                })
                res.status(200).send()      
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

function generateAccessToken(id,name){
    return jwt.sign({ id: id, name : name},jwtSecretKey)
}


exports.postLogin = async (req,res,next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const users = await User.findAll({where : {email : email}})
        const user = users[0];
        if(!user){
            res.status(404).json({message : "User Not Found !!!"})
        }
        else{
            bcrypt.compare(password,user.password, (err,result) => {
                if(result){
                    res.status(200).json({message : "user Found",token : generateAccessToken(user.id, user.name) })
                }
                else{
                    res.status(401).json({message : "Incorrect Password !!"})
                }
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.getPremium = (req,res,next) => {
    const user = req.user;
    if(user){
        return res.status(200).json({isPremium : user.isPremium})
    }
}