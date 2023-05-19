const router = require("express").Router();
const {toggleProductFavorite
} = require("../../controllers/api/favoritesApiController");

/* /api/favorite */

router
  .get("/toggle", toggleProductFavorite)


module.exports = router;
