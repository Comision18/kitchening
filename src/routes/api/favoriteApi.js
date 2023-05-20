const router = require("express").Router();
const {toggleProductFavorite, getProductsFavorites
} = require("../../controllers/api/favoritesApiController");

/* /api/favorite */

router
  .get("/", getProductsFavorites)
  .put("/toggle", toggleProductFavorite)


module.exports = router;
