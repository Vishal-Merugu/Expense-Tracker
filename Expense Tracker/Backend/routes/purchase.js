const express = require('express');

const router = express.Router();

const authenticateUser = require('../middlewares/auth')

const purchaseControllers = require('../controllers/purchase');

router.get("/premiumMembership",authenticateUser.authenticate, purchaseControllers.purchasePremium )

router.post('/updateTransaction', authenticateUser.authenticate, purchaseControllers.updateTransaction)



module.exports = router;