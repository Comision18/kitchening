const express =require('express');
const router = express.Router();

const {list,detail, add, edit} = require('../controllers/courseController');

/* /courses */

router
    .get('/list',list)
    .get('/detail/:id',detail)
    .get('/add',add)
    .get('/edit/:id',edit)


module.exports = router;