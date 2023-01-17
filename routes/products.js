const express =require('express');
const router = express.Router();

const {list,detail} = require('../controllers/productController')

/* /products */

router.get('/list',list)




module.exports = router;