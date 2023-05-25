const express = require('express')

const router = express.Router()

const authenticateUser = require('../middlewares/auth');

const premiumControllers = require('../controllers/premium');

router.get('/leaderboard',authenticateUser.authenticate, premiumControllers.getLeaderboard )


module.exports = router;