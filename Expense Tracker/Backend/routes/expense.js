const express = require('express')

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/expense/:expenseId',expenseController.getExpense)

router.get('/expenses',expenseController.getExpenses)

router.post('/expense',expenseController.postExpense);

router.delete('/expense/:expenseId',expenseController.deleteExpense);

router.put('/expense/:expenseId',expenseController.editExpense)

module.exports = router;