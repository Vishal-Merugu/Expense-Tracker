const User = require('../models/user');


exports.getLeaderboard = async (req,res,next) => {
    try{    

        const userleaderboard = await User.find().select("name totalExpenses").sort({ "totalExpenses" : "desc" })
        res.status(200).json(userleaderboard)
    }
    catch(err){
        console.log(err);
    }
    
}