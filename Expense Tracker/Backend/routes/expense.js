const express = require('express')

const expenseController = require('../controllers/expense');

const authenticateUser = require('../middlewares/auth')

const router = express.Router();

router.get('/expense/:expenseId', authenticateUser.authenticate,expenseController.getExpense)

router.get('/expenses', authenticateUser.authenticate,expenseController.getExpenses)

router.post('/expense', authenticateUser.authenticate,expenseController.postExpense);

router.delete('/expense/:expenseId', authenticateUser.authenticate,expenseController.deleteExpense);

router.put('/expense/:expenseId',authenticateUser.authenticate,expenseController.editExpense);

router.get("/expenses/user/report", authenticateUser.authenticate, expenseController.getReport);

router.get('/expenses/user/downloadreport', authenticateUser.authenticate, expenseController.downloadReport);

module.exports = router;