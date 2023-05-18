const { Op } = require("sequelize");
const db = require("../database/models");

module.exports = mtd = {
  getOrder: async ({ userId }) => {
    if (!userId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId",
      };
    }

    const [order] = await db.Order.findOrCreate({
      where: {
        [Op.and]: [
          {
            userId,
          },
          {
            status: "pending",
          },
        ],
      },
      defaults: {
        // order  --> cart  --> courses  -->  images
        userId,
      },
      include: [
        {
          association: "cart",
          include: ["images"],
        },
      ],
    });
    return order;
  },

  createProductInCart: async ({ userId, courseId }) => {
    if (!userId || !courseId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId y courseId",
      };
    }

    const order = await mtd.getOrder({ userId });

    await mtd.createCart({ orderId: order.id, courseId });
  },
  createCart: ({ orderId, courseId }) => {
    return db.Cart.create({ orderId, courseId });
  },
};
