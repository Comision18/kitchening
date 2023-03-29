'use strict';

/** @type {import('sequelize-cli').Migration} */

const chefs = require('../../data/chefs.json');

const chefsUpdated = chefs.map(({name,country,photo}) => {
  return {
    name,
    photo,
    country,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Chefs',chefsUpdated, {});
  
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Chefs', null, {});
   
  }
};
