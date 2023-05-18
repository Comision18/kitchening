"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Order.belongsToMany(models.Course, {
        foreignKey: "orderId",
        otherKey: "courseId",
        through: "Cart",
        as: "cart",
      });
    }
  }
  Order.init(
    {
      date: { type: DataTypes.DATE, defaultValue: new Date() },
      total: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        validate: {
          isIn: {
            args: [["cancelled", "completed", "pending"]],
            msg: 'Los valores validos son ["cancelled", "completed", "pending"]',
          },
        },
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
