"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name : "Cocina",
          image : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : "Pastelería",
          image : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : "Panadería",
          image : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : "Vinos y bebidas",
          image : null,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
