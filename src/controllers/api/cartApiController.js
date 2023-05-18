const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const {
  getOrder,
  createProductInCart,
  removeProductFromCart,
  moreQuantityFromProduct,
} = require("../../services/cartServices");
module.exports = {
  getOrderPending: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const order = await getOrder({ userId: id });
      sendSuccessResponse(res, { data: order });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  addProduct: async (req, res) => {
    try {
      const { courseId } = req.body;
      // const { id } = req.session.userLogin;
      await createProductInCart({ userId: 3, courseId });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  removeProduct: async (req, res) => {
    try {
      const { courseId } = req.body;
      const { id } = req.session.userLogin;
      await removeProductFromCart({ userId: id, courseId });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  moreQuantity: async (req, res) => {
    try {
      const { courseId } = req.body;
      // const { id } = req.session.userLogin;
      const order = await moreQuantityFromProduct({ userId: 3, courseId });
      sendSuccessResponse(res,{data:order});
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  lessQuantity: (req, res) => {},
  clearCart: (req, res) => {},
  statusOrder: (req, res) => {},
};
