const Expense = require('../models/expense');
const sequelize = require('../util/database');
const userServices = require('../services/userservices')
const s3Services = require('../services/s3services');
let converter = require("json-2-csv");
require('dotenv').config();


exports.getExpense = async (req,res,next) => { 
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        const expenses = await user.getExpenses({where : {id : expenseId }})
        const expense = expenses[0]
        console.log(expense);
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
        const expenses = await userServices.getExpenses(req)
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

exports.getReport = async (req,res,next) => {
    try{
        const user = req.user;
        currentYear = new Date().getFullYear()
    
        const yearlyExpenses = []
    
        for(let month = 1; month <= 12; month++){
            let monthExpenses = await user.getExpenses({
                attributes : ['amount', 'expense', 'category'],
                where : sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), month),
                and: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), currentYear)
            })
    
            let monthTotalExpense = 0
            if(monthExpenses){
                monthExpenses.forEach(expense => {
                    monthTotalExpense += expense.amount
                });
            }
    
            yearlyExpenses.push({expenses : monthExpenses, monthTotalExpense : monthTotalExpense})
        }
        
        res.json(yearlyExpenses)
    }
    catch(err){
        console.log(err);
    }
}

exports.downloadReport = async (req,res,next) => {
    try{
        const user = req.user;
        const expensesResponse = await user.getExpenses({
            attributes : ['expense', 'category', 'amount']
        });
        const expenses = []
        expensesResponse.forEach(expense => {
            expenses.push(expense.dataValues)
        })
        const csv = await converter.json2csv(expenses)
        const fileName = `Expense_${user.id}/${user.name}_Report_${new Date()}.csv`;
        const fileUrl = await s3Services.uploadTos3(csv,fileName);
        // console.log(fileUrl);
        res.status(200).json({ fileUrl, success : true })
    }
    catch(err){
        res.status(500).json({success : false, err : err})
        console.log(err);
    }

}