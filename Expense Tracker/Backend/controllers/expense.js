const Expense = require('../models/expense');

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
    try{
        const user = req.user
        const { amount, expense, description, category } = req.body;
        // const newExpense = await Expense.create({
        //     amount : amount,
        //     expense : expense,
        //     description : description,
        //     category : category,
        //     userId : user.id
        // })
        const newExpense = await user.createExpense({
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
    try{
        const user = req.user;
        const expenseId = req.params.expenseId
        // const expense = await Expense.findByPk(expenseId)
        const expenses = await user.getExpenses({where : {id : expenseId}})
        const expense = expenses[0]
        expense.destroy()
        res.status(200).json({ success : true } )
    }
    catch(err){
        console.log(err);
    }
}

exports.editExpense = async (req,res,next) => {
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        // const oldExpense = await Expense.findByPk(expenseId);
        const oldExpenses = await user.getExpenses({where : { id : expenseId}})
        oldExpense = oldExpenses[0]
        const { expense, amount, description, category } = req.body

        oldExpense.expense = expense;
        oldExpense.amount = amount;
        oldExpense.description = description;
        oldExpense.category = category
        
        const newExpense = await oldExpense.save()
        res.json(newExpense)
    }
    catch(err){
        console.log(err);
    }
}