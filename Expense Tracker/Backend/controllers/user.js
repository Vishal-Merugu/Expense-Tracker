const User = require('../models/user');

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.postSignUp = async (req,res,next) => {
    try{
        const { name, email, phone, password } = req.body
        const users = await User.findAll({where : { email : email }})
        const user = users[0]
        console.log(user);
        if(user){
            res.status(404).send("User Already Exists !!")
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

exports.postLogin = async (req,res,next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const users = await User.findAll({where : {email : email}})
        const user = users[0];
        if(!user){
            res.status(404).send("User Not Found !!!")
        }
        else{
            bcrypt.compare(password,user.password, (err,result) => {
                if(result){
                    res.status(200).send("user Found")
                }
                else{
                    res.status(401).send("Incorrect Password !!")
                }
            })
        }
    }
    catch(err){
        console.log(err);
    }
}
