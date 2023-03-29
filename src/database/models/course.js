'use strict';
const {
  Model
} = require('sequelize');
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
    }
  }
  Course.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    free: DataTypes.BOOLEAN,
    visible: DataTypes.BOOLEAN,
    chefId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};