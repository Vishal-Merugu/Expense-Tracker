const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

const authenticatUser = require("../middlewares/auth")

router.post('/signup',userController.postSignUp);

router.post('/login',userController.postLogin)

router.get('/isPremium',authenticatUser.authenticate, userController.getPremium)

module.exports = router;