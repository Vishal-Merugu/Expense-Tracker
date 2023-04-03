const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();



router.get('/signup',userController.getSignUp);

router.post('/signup',userController.postSignUp);

router.get('/login',userController.getLogin);

router.post('/login',userController.postLogin)

module.exports = router;