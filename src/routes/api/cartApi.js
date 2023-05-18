const router = require("express").Router();
const {
  clearCart,
  statusOrder,
  moreQuantityCourse,
  addCourse,
  removeCourse,
  lessQuantityCourse,
  getOrderPending,
} = require("../../controllers/api/cartApiController");

/* /api/cart */

router
  .get("/getOrderPending", getOrderPending)
  .post("/add", addCourse)
  .post("/remove", removeCourse)
  .post("/clear", clearCart)
  .post("/more", moreQuantityCourse)
  .post("/less", lessQuantityCourse)
  .post("/status", statusOrder);

module.exports = router;
