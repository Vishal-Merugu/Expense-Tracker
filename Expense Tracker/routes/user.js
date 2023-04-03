const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/signUp',userController.getSignUp);

router.post('/signUp',userController.postSignUp);

module.exports = router;