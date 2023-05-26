const FilesDownloaded = require('../models/filesdownloaded');
const user = require('../models/user');
const s3Services = require('../services/s3services');
let converter = require("json-2-csv");
require('dotenv').config();


exports.getExpense = async (req,res,next) => { 
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        const expense = await user.expenses.filter(expense => {
            if(expense._id == expenseId){
                return expense
            }
        })
        res.status(200).json(expense[0])
    }
    catch(err){
        console.log(err);
    }
}

exports.postExpense = async (req,res,next) => {
    try{
        const user = req.user
        const { amount, expense, description, category } = req.body;
        
        const newExpense = await  user.expenses.push({
            amount : amount,
            expense : expense,
            description : description,
            category : category,
        })
        user.totalExpenses = await  +user.totalExpenses + +amount
        user.save()
        res.status(200).json(newExpense)
    }
    catch(err){
        res.status(400).json({ success : false })
        console.log(err);
    }
}

exports.getExpenses = async (req,res,next) => {
    try{
        const user = req.user;
        const page = req.headers.page;
        const limit  = req.headers.limit;
        const expenses = await user.getExpenses(+page,+limit)
        res.status(200).json(expenses)
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteExpense = async (req,res,next) => {
    try{
        const user = req.user;
        const expenseId = req.params.expenseId
        user.deleteExpense(expenseId);
        res.status(200).json({ success : true } )
    }
    catch(err){
        res.status(200).json({ success : false } )
        console.log(err);
    }
}

exports.editExpense = async (req,res,next) => {
    try{
        const user = req.user;
        const expenseId = req.params.expenseId;
        const expenseIndex = await user.expenses.findIndex(expense => expense._id == expenseId)
        const oldAmount = user.expenses[expenseIndex].amount

        const { expense, amount, description, category } = req.body
        
        user.totalExpenses = +user.totalExpenses - +oldAmount + +amount 

        user.expenses[expenseIndex] = {
            expense : expense,
            amount : amount,
            description : description,
            category : category
        }
        user.save()
        res.status(200).json(user.expenses[expenseIndex])
    }
    catch(err){
        console.log(err);
        res.status(400).json( {success : false} )
    }
}

exports.getReport = async (req,res,next) => {
    try{
        const user = req.user;
        const yearlyExpenses = await user.getReport()
        res.status(200).json(yearlyExpenses)
    }
    catch(err){
        console.log(err);
    }
}

exports.downloadReport = async (req,res,next) => {
    try{
        const user = req.user;
        const expensesRaw = await user.expenses;
        expenses = expensesRaw.map(expense => {
            return {
                expense : expense.expense,
                category : expense.category,
                description : expense.description,
                price : expense.amount
            }
        })

        const csv = await converter.json2csv(expenses)
        const fileName = `Expense_${user.id}/${user.name}_Report_${new Date()}.csv`;
        const fileUrl = await s3Services.uploadTos3(csv,fileName);
        //test url
        // const fileUrl = 'https://www.downloadexcelfiles.com/sites/default/files/docs/list_of_states_in_india-28j.csv'
        const filesDownloaded = await new FilesDownloaded({
            fileUrl : fileUrl,
            userId : user._id
        })
        filesDownloaded.save()
        res.status(200).json({ fileUrl, success : true })
    }
    catch(err){
        res.status(500).json({success : false, err : err})
        console.log(err);
    }

}