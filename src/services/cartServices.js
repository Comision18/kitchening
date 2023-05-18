const { Op } = require("sequelize");
const db = require("../database/models");
const configReload = {
  include: [
    {
      association: "cart",
      include: ["images"],
    },
  ],
};
module.exports = mtd = {
  getOrder: async ({ userId }) => {
    if (!userId) {
      throw {
        status: 400,
        message: "Debes enviar el userId",
      };
    }
    const [order] = await db.Order.findOrCreate({
      where: {
        [Op.and]: [
          {
            status: "pending",
          },
          {
            userId,
          },
        ],
      },
      defaults: {
        userId,
      },
      ...configReload,
    });
    order.total = mtd.calcTotal(order);
    await order.save();
    return order;
  },
  getCart: async ({ courseId, orderId }) => {
    if (!courseId || !orderId) {
      throw {
        status: 400,
        message: "Debes enviar el orderId y courseId",
      };
    }
    return db.Cart.findOrCreate({
      where: {
        [Op.and]: [
          {
            courseId,
          },
          { orderId },
        ],
      },
      defaults: {
        courseId,
        orderId,
      },
    });
  },
  createCourseInCart: ({ courseId, orderId }) => {
    if (!orderId || !courseId) {
      throw {
        status: 400,
        message: "Debes enviar el courseId y el orderId",
      };
    }

    return db.Cart.create({
      orderId,
      courseId,
    });
  },
  removeCourseInCart: ({ courseId, orderId }) => {
    if (!orderId || !courseId) {
      throw {
        status: 400,
        message: "Debes enviar el courseId y el orderId",
      };
    }
    return db.Cart.destroy({
      where: {
        [Op.and]: [
          {
            courseId,
          },
          {
            orderId,
          },
        ],
      },
    });
  },
  removeAllCoursesInCart: async ({ userId }) => {
    if (!userId) {
      throw {
        status: 400,
        message: "Debes enviar el userId",
      };
    }

    const order = await mtd.getOrder({ userId });

    return db.Cart.destroy({
      where: {
        orderId: order.id,
      },
    });
  },
  addQuantity: async ({ courseId, userId }) => {
    const order = await mtd.getOrder({ userId });
    if (!courseId) {
      throw {
        status: 400,
        message: "Debes enviar el courseId",
      };
    }
    const [cartItem, isCreated] = await mtd.getCart({
      courseId,
      orderId: order.id,
    });
    if (!isCreated) {
      ++cartItem.quantity;
      await cartItem.save();
    }

    const orderReload = await order.reload(configReload);
    order.total = mtd.calcTotal(orderReload);

    await order.save();
    return order;
  },
  minQuantity: async ({ courseId, userId }) => {
    const order = await mtd.getOrder({ userId });
    if (!courseId) {
      throw {
        status: 400,
        message: "Debes enviar el courseId",
      };
    }
    const cartItem = await db.Cart.findOne({
      where: {
        [Op.and]: [
          {
            courseId,
          },
          { orderId: order.id },
        ],
      },
    });

    if (cartItem?.quantity === 1) {
      await mtd.removeCourseInCart({ courseId, orderId: order.id });
    } else if (cartItem?.quantity > 1) {
      --cartItem.quantity;
      await cartItem.save();
    }

    const orderReload = await order.reload(configReload);
    order.total = mtd.calcTotal(orderReload);

    await order.save();
    return order;
  },
  saveStatusOrder: async ({ statusOrder, userId }) => {
    const order = await mtd.getOrder({ userId });
    if (!statusOrder) {
      throw {
        status: 400,
        message: "Debes enviar el statusOrder",
      };
    }
    order.status = statusOrder;
    await order.save();
    return order.reload({ include: { all: true } });
  },
  calcTotal: (order) => {
    return order.cart.length
      ? order.cart.reduce(
          (acum, product) => (acum += product.Cart.quantity * product.price),
          0
        )
      : 0;
  },
};
