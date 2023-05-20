const { Op } = require("sequelize");
const db = require("../database/models");
const { literalQueryUrlImage } = require("../helpers");

module.exports = mtd = {
  addOrRemoveToFavorite: async ({ userId, courseId }) => {
    if (!userId || !courseId) {
      throw {
        status: 400,
        message: "Debes ingresar el userId y el courseId",
      };
    }

    const [favorite, isCreatedFavorite] = await db.Favorite.findOrCreate({
      where: { [Op.and]: [{ userId }, { courseId }] },
      defaults: {
        userId,
        courseId,
      },
    });

    if (!isCreatedFavorite) {
      await favorite.destroy();
    }
    return { isRemove: !isCreatedFavorite };
  },
  getUserWithFavorites: async ({ userId, req }) => {
    if (!userId) {
      throw {
        status: 400,
        message: "Debes ingresar el userId",
      };
    }
    const options = {
      where: { id: userId },
      include: [
        {
          association: "coursesFavorites",
          include: [
            {
              association: "images",
              /* attributes: {
                include: [
                  literalQueryUrlImage(req, "courses", "name", "urlImage"),
                ],
              }, */
            },
          ],
        },
      ],
    };

    return db.User.findOne(options);
  },
};
