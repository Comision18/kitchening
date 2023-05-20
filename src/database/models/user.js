"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Address, {
        foreignKey: "addressId",
        as: "address",
      });

      User.belongsTo(models.Rol, {
        foreignKey: "rolId",
        as: "rol",
      });

      User.hasMany(models.Order,{
        foreignKey:'userId',
        as:'orders'
      })

      User.belongsToMany(models.Course, {
        foreignKey: 'userId',
        otherKey:'courseId',
        through: 'Favorites',
        as:'coursesFavorites'
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      socialId: DataTypes.STRING,
      socialProvider: DataTypes.STRING,
      rolId: { type: DataTypes.INTEGER, defaultValue: 2 },
      addressId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
