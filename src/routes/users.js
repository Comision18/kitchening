const express = require('express');
const router = express.Router();

const {register,login,profile, processRegister, processLogin, update, logout, list, cart,favorites} = require('../controllers/userController');
const checkUser = require('../middlewares/checkUser');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { uploadUserImage } = require('../middlewares/upload');
const { registerUserValidator, loginUserValidator } = require('../validations');

/* /users */

router
    .get('/register',checkUser, register)
    .post('/register',registerUserValidator, processRegister)
    .get('/login',checkUser, login)
    .post('/login',loginUserValidator,processLogin)
    .get('/profile',checkUserLogin, profile)
    .get('/cart',checkUserLogin, cart)
    .get('/favorites',checkUserLogin, favorites)
    .put('/update',uploadUserImage.single('image'),update)
    .get('/logout',checkUserLogin,logout)
    .get('/', list)

module.exports = router;
