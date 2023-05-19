const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const { getUserWithFavorites } = require("../../services/favoritesServices");

module.exports = {
  toggleProductFavorite: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const { courseId } = req.body;
      await addOrRemoveToFavorite({ userId: id, courseId });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  getProductsFavorites: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const favorites = await getUserWithFavorites({ userId: id });
      sendSuccessResponse(res,{ data: favorites.coursesFavorites });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
};
