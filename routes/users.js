const express = require('express');
const router = express.Router();

const {register,login,profile, processRegister, processLogin, update, logout} = require('../controllers/userController');
const { registerUserValidator, loginUserValidator } = require('../validations');

/* /users */

router
    .get('/register',register)
    .post('/register',registerUserValidator, processRegister)
    .get('/login', login)
    .post('/login',loginUserValidator,processLogin)
    .get('/profile',profile)
    .put('/update',update)
    .get('/logout',logout)

module.exports = router;
