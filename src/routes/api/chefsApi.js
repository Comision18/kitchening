const { index } = require('../../controllers/api/chefController');

const router  = require('express').Router();
/* /api/chefs */

router
  .get('/',index)
   

module.exports = router;