const router = require("express").Router();
const {toggleCourseFavorite,getFavorites
} = require("../../controllers/api/favoritesApiController");

/* /api/favorite */

router
  .get("/", getFavorites)
  .post("/toggle", toggleCourseFavorite)


module.exports = router;