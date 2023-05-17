'use strict';
const {
  Model
} = require('sequelize');

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Image,{
        as : 'images',
        foreignKey : 'courseId',
        onDelete : 'cascade'
      });

      Course.belongsTo(models.Chef,{
        as : 'chef',
        foreignKey : 'chefId',
      });

      Course.belongsTo(models.Category,{
        as : 'category',
        foreignKey : 'categoryId',
      });

      Course.belongsToMany(models.Order,{
        foreignKey:'courseId',
        otherKey:'orderId',
        through:'Cart',
        as:'cart'
      })
    }
  }
  Course.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    free: DataTypes.BOOLEAN,
    visible: DataTypes.BOOLEAN,
    chefId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  sequelizePaginate.paginate(Course)
  return Course;
};