const router  = require('express').Router();
const {index, detail,verifyEmail} = require('../../controllers/api/userApiController')
/* /api/users */

router
    .get('/',index)
    .get('/:id',detail)
    .post('/verify-email',verifyEmail)
   

module.exports = router;