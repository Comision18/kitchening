const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const {
  getUserWithFavorites,
  addOrRemoveToFavorite,
} = require("../../services/favoritesServices");

module.exports = {
  getFavorites: async (req, res) => {
    try {
      // const { id } = req.session.userLogin;
      const user = await getUserWithFavorites({ userId: 3 });
      sendSuccessResponse(res, { data: user.coursesFavorites });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  toggleCourseFavorite: async (req, res) => {
    try {
      // const { id } = req.session.userLogin;
      const { courseId } = req.body;
      addOrRemoveToFavorite({ userId: 3, courseId });
      sendSuccessResponse(res);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
};
