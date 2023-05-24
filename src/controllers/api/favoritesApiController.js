const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const {
  getUserWithFavorites,
  addOrRemoveToFavorite,
} = require("../../services/favoritesServices");

module.exports = {
  getFavorites: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const user = await getUserWithFavorites({ userId: id });
      sendSuccessResponse(res, { data: user.coursesFavorites });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  },
  toggleCourseFavorite: async (req, res) => {
    try {
      const { id } = req.session.userLogin;
      const { courseId } = req.body;
      const isRemove = await addOrRemoveToFavorite({ userId: id, courseId });
      sendSuccessResponse(res, { data: { isRemove } });
    } catch (error) {
      console.log()
      sendErrorResponse(res, error);
    }
  },
};
