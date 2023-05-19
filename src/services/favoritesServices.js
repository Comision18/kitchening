const { Op } = require("sequelize");
const db = require("../database/models");

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
    });

    if (!isCreatedFavorite) {
      await favorite.destroy();
    }
  },
  getUserWithFavorites: async ({ userId }) => {
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
          include: ["images"],
        },
      ],
    };

    return db.User.findOne(options);
  },
};
