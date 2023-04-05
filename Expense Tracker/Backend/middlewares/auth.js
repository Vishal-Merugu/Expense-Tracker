const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtSecretKey = "8TVCOrH3u_tfvcOl6sNVK_g_2AjwyvAkkq4bDD6xmSc"

const authenticate = (req, res, next) => {
    try{
        // const token = req.header('Authorization');
        const token = req.headers["authorization"]
        const user = jwt.verify(token, jwtSecretKey)
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
