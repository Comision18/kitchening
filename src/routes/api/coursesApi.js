const router  = require('express').Router();
const {index, detail, store, update, destroy} = require('../../controllers/api/courseApiController');
const { uploadImage } = require('../../middlewares/upload');
/* /api/courses */

router
    .get('/',index)
    .get('/:id',detail)
    .post('/', uploadImage.fields([
        {name : 'image_1'},
        {name : 'image_2'},
        {name : 'image_3'},
    ]), store)
    .patch('/:id',uploadImage.fields([
        {name : 'image_1'},
        {name : 'image_2'},
        {name : 'image_3'},
    ]),update)
    .delete('/:id',destroy)
   

module.exports = router;