const { Op } = require("sequelize");
const db = require("../database/models");

const getOrder = async ({ userId }) => {
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
};

const calcTotal = ({ cart }) => {
  return cart.reduce((acum, { price, Cart, discount }) => {
    const priceCalc = discount ? price - (price * discount) / 100 : price;
    acum += priceCalc * Cart.quantity;
    return acum;
  }, 0);
};

const getCart = ({ orderId, courseId }) => {
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
};

const removeCart = ({ orderId, courseId }) => {
  return db.Cart.destroy({
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
};

module.exports = {
  getOrder,
  createProductInCart: async ({ userId, courseId }) => {
    if (!userId || !courseId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId y courseId",
      };
    }

    const order = await getOrder({ userId });

    await getCart({ orderId: order.id, courseId });

    const orderReload = await order.reload({ include: { all: true } });
    order.total = calcTotal(orderReload);
    await order.save();
  },
  removeProductFromCart: async ({ userId, courseId }) => {
    if (!userId || !courseId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId y courseId",
      };
    }
    const order = await getOrder({ userId });

    await removeCart({ orderId: order.id, courseId });

    const orderReload = await order.reload({ include: { all: true } });
    order.total = calcTotal(orderReload);
    await order.save();
  },
  moreOrLessQuantityFromProduct: async ({
    userId,
    courseId,
    action = "more",
  }) => {
    if (!userId || !courseId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId y courseId",
      };
    }

    const order = await getOrder({ userId });

    const [cart, isCreated] = await getCart({
      orderId: order.id,
      courseId,
    });

    if (!isCreated) {
      if (action === "more") {
        cart.quantity++;
      } else {
        if (cart.quantity > 1) {
          cart.quantity--;
        }
      }
      await cart.save();
    }

    const orderReload = await order.reload({ include: { all: true } });
    order.total = calcTotal(orderReload);
    await order.save();

    return order;
  },
  clearAllProductFromCart: async ({ userId }) => {
    if (!userId) {
      throw {
        ok: false,
        message: "Debes ingresar el userId",
      };
    }

    const order = await getOrder({ userId });

    await db.Cart.destroy({
      where: { orderId: order.id },
    });

    const orderReload = await order.reload({ include: { all: true } });
    order.total = calcTotal(orderReload);
    await order.save();
  },
  modifyStatusFromOrder: async ({ userId, status }) => {
    if (!userId || !status) {
      throw {
        ok: false,
        message: "Debes ingresar el userId y status",
      };
    }

    const order = await getOrder({ userId });
    order.status = status;
    return order.save();
  },
};
