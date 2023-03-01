const express = require('express');
const router = express.Router();

const {home,admin} = require('../controllers/indexController');
const checkUserAdmin = require('../middlewares/checkUserAdmin');

/* / */
router
    .get('/', home)
    .get('/admin',checkUserAdmin,admin)

module.exports = router;
