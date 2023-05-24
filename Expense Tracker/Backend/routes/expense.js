const express = require('express')

const expenseController = require('../controllers/expense');

const authenticateUser = require('../middlewares/auth')

const router = express.Router();

router.get('/', authenticateUser.authenticate,expenseController.getExpenses)

router.get('/:expenseId', authenticateUser.authenticate,expenseController.getExpense)

router.post('/expense', authenticateUser.authenticate,expenseController.postExpense);

router.delete('/:expenseId', authenticateUser.authenticate,expenseController.deleteExpense);

router.put('/:expenseId',authenticateUser.authenticate,expenseController.editExpense);

// router.get("/user/report", authenticateUser.authenticate, expenseController.getReport);

// router.get('/user/downloadreport', authenticateUser.authenticate, expenseController.downloadReport);

module.exports = router;