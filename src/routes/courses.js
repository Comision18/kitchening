const express =require('express');
const router = express.Router();

const {list,detail, add, edit, store, update, removeConfirm, remove, search} = require('../controllers/courseController');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const { uploadCoursesImages } = require('../middlewares/upload');
const courseValidator = require('../validations/courseValidator');

/* /courses */

router
    .get('/list',list)
    .get('/detail/:id',detail)
    .get('/add', checkUserAdmin,add)
    .post('/add',uploadCoursesImages, courseValidator, store)
    .get('/edit/:id',checkUserAdmin,  edit)
    .put('/update/:id',uploadCoursesImages, courseValidator, update)
    .delete('/remove/:id',remove)
    .get('/search',search)


module.exports = router;