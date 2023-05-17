const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const {
  createCourseInCart,
  getOrder,
  removeCourseInCart,
  removeAllCoursesInCart,
  addQuantity,
  minQuantity,
  saveStatusOrder,
} = require("../../services/cartServices");

module.exports = {
  addCourse: async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      const order = await getOrder({
        userId,
      });
      await createCourseInCart({ courseId, orderId: order.id });
      const orderReload = await order.reload({
        include: { all: true },
      });

      sendSuccessResponse(res, { data: orderReload.cart });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  removeCourse: async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      const order = await getOrder({ userId });
      await removeCourseInCart({
        courseId,
        orderId: order.id,
      });
      const orderReload = await order.reload({ include: { all: true } });
      sendSuccessResponse(res, { data: orderReload.cart });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  clearCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const order = await removeAllCoursesInCart({ userId });

      sendSuccessResponse(res, { data: order.cart });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  moreQuantityCourse: async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      const order = await addQuantity({ userId, courseId });
      sendSuccessResponse(res, { data: order.cart });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  lessQuantityCourse: async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      const order = await minQuantity({ userId, courseId });
      sendSuccessResponse(res, { data: order?.cart });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  statusOrder: async (req, res) => {
    try {
      const { statusOrder, userId } = req.body;
      const order = await saveStatusOrder({ statusOrder, userId });
      sendSuccessResponse(res, { data: order });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
};
