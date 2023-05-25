const express = require('express')

const router = express.Router()

const passwordControllers = require('../controllers/password');

router.post('/forgotpassword', passwordControllers.postForgotPassword);

router.get('/resetpassword/:id', passwordControllers.getResetPassword);

router.post('/resetpassword/:id', passwordControllers.postUpdatePassword)

module.exports = router;