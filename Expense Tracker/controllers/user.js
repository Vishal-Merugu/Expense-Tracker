const User = require('../models/user');

const path = require("path");
const rootDir = require('../util/path')

exports.getSignUp = (req,res,next) => {
    res.sendFile(path.join(rootDir,'views','user','signup.html'))
}

exports.postSignUp = (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    User.findAll({where : {
        email : email
    }})
    .then(user => {
        if(user[0]){
            res.status(404).send()
        }
        else{
            return User.create({
                name : name,
                email : email,
                phone : phone,
                password : password
            })
            .then((user) =>{
                res.send("/user/login")
                
            })
            .catch(err => console.log(err))
        }
    })
}


exports.getLogin = (req,res,next) => {
    res.sendFile(path.join(rootDir,"views",'user','login.html'))
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findAll({where : {email : email}})
    .then(users => {
        user = users[0];
        if(!user){
            res.status(404).send("User Not Found")
        }
        else if (user.password != password){
            res.status(401).send("Password Doesn't Match")
        }
        else if (user.password == password){
            res.send("user Found")
        }
    })
}
