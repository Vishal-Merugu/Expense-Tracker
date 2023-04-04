const Expense = require('../models/expense');

exports.getExpense = async (req,res,next) => { 
    try{
        const expenseId = req.params.expenseId;
        const expense = await Expense.findByPk(expenseId)
        res.json(expense)
    }
    catch{
        console.log(err);
    }
}

exports.postExpense = async (req,res,next) => {
    try{
        const { amount, expense, description, category } = req.body;
        const newExpense = await Expense.create({
            amount : amount,
            expense : expense,
            description : description,
            category : category
        })
        res.status(200).json(newExpense)
    }
    catch(err){
        console.log(err);
    }
}

exports.getExpenses = async (req,res,next) => {
    const expenses = await Expense.findAll()
    res.json(expenses)
}

exports.deleteExpense = async (req,res,next) => {
    try{
        const expenseId = req.params.expenseId
        const expense = await Expense.findByPk(expenseId)
        expense.destroy()
        res.status(200).send()
    }
    catch{
        console.log(err);
    }
}

exports.editExpense = async (req,res,next) => {
    try{
        const expenseId = req.params.expenseId;
        const oldExpense = await Expense.findByPk(expenseId);
        const { expense, amount, description, category } = req.body

        oldExpense.expense = expense;
        oldExpense.amount = amount;
        oldExpense.description = description;
        oldExpense.category = category
        
        const newExpense = await oldExpense.save()
        res.json(newExpense)
    }
    catch{
        console.log(err);
    }
}