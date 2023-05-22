const { metrics } = require('../../controllers/api/mainApiController');

const router  = require('express').Router();
/* /api */

router
  .get('/metrics',metrics)
   

module.exports = router;