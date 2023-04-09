const User = require('../models/user');
const Expense = require('../models/expense');

exports.getLeaderboard = async (req,res,next) => {
    try{
        const users = await User.findAll()
        const expenses = await Expense.findAll()
        userAggregatedExpenses = {}
        expenses.forEach(expense => {
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId] += expense.amount;
            }else{
                userAggregatedExpenses[expense.userId] = expense.amount
            }
        })
        
        userLeaderboard = []
        users.forEach(user => {
            let temp = {
                name : user.name,
                totalAmount : userAggregatedExpenses[user.id]
            }
            userLeaderboard.push(temp)
        })
        userLeaderboard.sort((a,b)=> {
            return b.amount - a.amount
        })
        res.status(200).json(userLeaderboard)
    }
    catch(err){
        console.log(err);
    }
    
}