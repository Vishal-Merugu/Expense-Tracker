const jwt = require('jsonwebtoken');
const User = require('../models/user');

const dotenv =  require("dotenv");
dotenv.config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authenticate = (req, res, next) => {
    try{
        // const token = req.header('Authorization');
        const token = req.headers["authorization"]
        const user = jwt.verify(token, JWT_SECRET_KEY)
        userId = user.id
        User.findByPk(userId)
        .then((user) => {
            req.user = user;
            next()
        })
        .catch(err => console.log(err)) 
        
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ success : false })
    }
}

module.exports = {
    authenticate
}
