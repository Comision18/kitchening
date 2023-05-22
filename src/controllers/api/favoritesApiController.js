const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const {
  getUserWithFavorites,
  addOrRemoveToFavorite,
} = require("../../services/favoritesServices");

module.exports = {
  toggleProductFavorite: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const { courseId } = req.body;
      const { isRemove } = await addOrRemoveToFavorite({
        userId: id,
        courseId,
      });
      sendSuccessResponse(res, { data: { isRemove } });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  getProductsFavorites: async (req, res) => {
    try {
      // const { id } = req.session.userLogin;
      const { coursesFavorites } = await getUserWithFavorites({
        userId: 3,
        req,
      });
      console.log(coursesFavorites[0].images);
      sendSuccessResponse(res, { data: coursesFavorites });
    } catch (error) {
      console.log(error);
      sendErrorResponse(res, error);
    }
  },
};
