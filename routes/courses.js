const express =require('express');
const router = express.Router();

const {list,detail, add, edit, store, update, removeConfirm, remove} = require('../controllers/courseController');
const { uploadCoursesImages } = require('../middlewares/upload');
const addCourseValidator = require('../validations/addCourseValidator');
const editCourseValidator = require('../validations/editCourseValidator');

/* /courses */

router
    .get('/list',list)
    .get('/detail/:id',detail)
    .get('/add',add)
    .post('/add',uploadCoursesImages, addCourseValidator, store)
    .get('/edit/:id',edit)
    .put('/update/:id',uploadCoursesImages, editCourseValidator, update)
    .get('/remove/:id',removeConfirm)
    .delete('/remove/:id',remove)


module.exports = router;