const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getExpense = async (req,res,next) => { 
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        const expenses = await user.getExpenses({where : {id : expenseId }})
        const expense = expenses[0]
        res.json(expense)
    }
    catch{
        console.log(err);
    }
}

exports.postExpense = async (req,res,next) => {
    const t = await sequelize.transaction()
    try{
        const user = req.user
        const { amount, expense, description, category } = req.body;

        const newExpense = await user.createExpense({
            amount : amount,
            expense : expense,
            description : description,
            category : category,
        },{ transaction : t })

        const totalExpenses = +user.totalExpenses + +amount

        await user.update({
            totalExpenses :  totalExpenses
        }, { transaction : t })

        await t.commit()

        res.status(200).json(newExpense)
    }
    catch(err){
        await t.rollback()
        res.status(400).json({ success : false })

        console.log(err);
    }
}

exports.getExpenses = async (req,res,next) => {
    try{
        const user = req.user;
        // const expenses = await Expense.findAll({where : {userId : user.id }}) 
        const expenses = await user.getExpenses()
        res.json(expenses)
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteExpense = async (req,res,next) => {
    const t = await sequelize.transaction()
    try{
        const user = req.user;
        const expenseId = req.params.expenseId

        const expenses = await user.getExpenses({where : {id : expenseId}})
        const expense = expenses[0]
        
        const totalExpenses = +user.totalExpenses - +expense.amount

        await user.update({
            totalExpenses : totalExpenses
        }, { transaction : t })

        await expense.destroy({transaction : t})
        t.commit()
        res.status(200).json({ success : true } )
    }
    catch(err){
        t.rollback()
        res.status(200).json({ success : false } )
        console.log(err);
    }
}

exports.editExpense = async (req,res,next) => {
    const t = await sequelize.transaction()
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        // const oldExpense = await Expense.findByPk(expenseId);
        const oldExpenses = await user.getExpenses({where : { id : expenseId}})
        oldExpense = oldExpenses[0]
        const { expense, amount, description, category } = req.body
        
        const totalExpenses = +user.totalExpenses - +oldExpense.amount + +amount 
        await user.update({
            totalExpenses : totalExpenses
        }, { transaction : t })

        const newExpense = await oldExpense.update({
            expense : expense,
            amount : amount,
            description : description,
            category : category
        }, { transaction : t })

        await t.commit()
        res.status(200).json(newExpense)
    }
    catch(err){
        t.rollback()
        console.log(err);
        res.status(400).json( {success : false} )
    }
}