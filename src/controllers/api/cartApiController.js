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

const configReload = {
  include: [
    {
      association: "cart",
      include: ["images"],
    },
  ],
};

module.exports = {
  addCourse: async (req, res) => {
    try {
      const { courseId } = req.body;
      const { id } = req.session.userLogin;
      const order = await getOrder({
        userId: id,
      });
      await createCourseInCart({ courseId, orderId: order.id });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  removeCourse: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const { courseId } = req.body;
      const order = await getOrder({ userId: id });
      await removeCourseInCart({
        courseId,
        orderId: order.id,
      });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  clearCart: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      await removeAllCoursesInCart({ userId: id });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  moreQuantityCourse: async (req, res) => {
    try {
      const { id } = req.session?.userLogin;
      const { courseId } = req.body;
      await addQuantity({ userId: id, courseId });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  lessQuantityCourse: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const { courseId } = req.body;
      await minQuantity({ userId: id, courseId });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  statusOrder: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const { statusOrder } = req.body;
      await saveStatusOrder({ statusOrder, userId: id });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  getOrderPending: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const order = await getOrder({ userId: id });
      sendSuccessResponse(res, { data: order });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
};
