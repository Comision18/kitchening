const express =require('express');
const router = express.Router();

const {list,detail} = require('../controllers/courseController');

/* /courses */

router
    .get('/list',list)
    .get('/detail/:id',detail)


module.exports = router;