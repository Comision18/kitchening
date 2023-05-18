const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const {
  getOrder,
  createProductInCart,
} = require("../../services/cartServices");
module.exports = {
  getOrderPending: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const order = await getOrder({ userId: id });
      sendSuccessResponse(res, { data: order });
    } catch (error) {
      sendErrorResponse(res,error)
    }
  },
  addProduct: async (req, res) => {
    try {
      const { courseId } = req.body;
      // const { id } = req.session.userLogin;
      await createProductInCart({ userId: 3, courseId });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res,error)
    }
  },
  removeProduct: (req, res) => {},
  moreQuantity: (req, res) => {},
  lessQuantity: (req, res) => {},
  clearCart: (req, res) => {},
  statusOrder: (req, res) => {},
};
