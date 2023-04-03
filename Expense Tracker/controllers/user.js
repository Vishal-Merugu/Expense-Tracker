const User = require('../models/user');

const path = require("path");
const rooDir = require('../util/path')

exports.getSignUp = (req,res,next) => {
    res.sendFile(path.join(rooDir,'views','user','signup.html'))
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
            res.status(400).send("error occured");
        }
        else{
            User.create({
                name : name,
                email : email,
                phone : phone,
                password : password
            })
            .then((user) => res.json(user))
            .catch(err => console.log(err))
        }
    })
}