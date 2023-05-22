const { index } = require('../../controllers/api/categoryApiController');

const router  = require('express').Router();
/* /api/categories */

router
  .get('/',index)
   

module.exports = router;