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
          through: {
            attributes: ["quantity"],
          },
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

    await mtd.getCart({ orderId: order.id, courseId });

    const orderReload = await order.reload({ include: { all: true } });
    order.total = mtd.calcTotal(orderReload);
    await order.save();
  },
  removeProductFromCart: async ({ userId, courseId }) => {
    if (!userId || !courseId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId y courseId",
      };
    }
    const order = await mtd.getOrder({ userId });

    return mtd.removeCart({ orderId: order.id, courseId });
  },
  moreQuantityFromProduct: async ({ userId, courseId }) => {
    if (!userId || !courseId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId y courseId",
      };
    }

    const order = await mtd.getOrder({ userId });

    const [cart, isCreated] = await mtd.getCart({
      orderId: order.id,
      courseId,
    });

    if (!isCreated) {
      cart.quantity++;
      await cart.save();
    }

    const orderReload = await order.reload({ include: { all: true } });
    order.total = mtd.calcTotal(orderReload);
    await order.save();

    return order;
  },
  removeCart: ({ orderId, courseId }) => {
    db.Cart.destroy({
      where: {
        [Op.and]: [
          {
            orderId,
          },
          {
            courseId,
          },
        ],
      },
    });
  },
  getCart: ({ orderId, courseId }) => {
    return db.Cart.findOrCreate({
      // [cart, isCreated]
      where: {
        [Op.and]: [
          {
            orderId,
          },
          {
            courseId,
          },
        ],
      },
      defaults: {
        orderId,
        courseId,
      },
    });
  },
  calcTotal: ({ cart }) => {
    return cart.reduce((acum, { price, Cart, discount }) => {
      const priceCalc = discount ? price - (price * discount) / 100 : price;
      acum += priceCalc * Cart.quantity;
      return acum;
    }, 0);
  },
};
