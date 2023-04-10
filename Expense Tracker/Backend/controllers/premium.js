const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getLeaderboard = async (req,res,next) => {
    try{    

        const userleaderboard = await User.findAll({
            attributes : ["name", "totalExpenses"],
            order : [["totalExpenses", "DESC"]]
        })

        res.status(200).json(userleaderboard)
    }
    catch(err){
        console.log(err);
    }
    
}