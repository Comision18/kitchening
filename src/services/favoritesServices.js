const { Op } = require("sequelize");
const db = require("../database/models");

module.exports = {
  getUserWithFavorites: ({ userId }) => {
    if (!userId) {
      throw {
        status: 400,
        message: "El necesario enviar el userId",
      };
    }
    const config = {
      include: [
        {
          association: "coursesFavorites",
          include: [
            {
              association: "images",
            },
          ],
        },
      ],
    };
    return db.User.findByPk(userId, config);
  },

  addOrRemoveToFavorite: async ({ userId, courseId }) => {
    if (!userId || !courseId) {
      throw {
        status: 400,
        message: "El necesario enviar el userId y el courseId",
      };
    }

    const config = {
      where: {
        [Op.and]: [
          {
            userId,
          },
          {
            courseId,
          },
        ],
      },
      defaults: { userId, courseId },
    };

    const [favorite, isCreated] = await db.Favorite.findOrCreate(config);

    if (!isCreated) {
      await favorite.destroy();
    }

    return !isCreated;
  },
};
