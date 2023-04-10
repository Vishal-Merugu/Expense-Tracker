const express = require('express')

const router = express.Router()

const passwordControllers = require('../controllers/password');

router.post('/forgotpassword', passwordControllers.postForgotPassword)


module.exports = router;