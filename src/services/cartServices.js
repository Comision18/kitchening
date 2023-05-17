const { Op } = require("sequelize");
const db = require("../database/models");

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
      default: {
        userId,
      },
    });

    return order;
  },
  getCart: async ({ courseId, orderId }) => {
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

    await db.Cart.destroy({
      where: {
        orderId: order.id,
      },
    });
    return order.reload({ include: { all: true } });
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
    return order.reload({ include: { all: true } });
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

    return order.reload({ include: { all: true } });
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
};
