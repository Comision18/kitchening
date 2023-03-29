'use strict';

/** @type {import('sequelize-cli').Migration} */

const coursesJSON = require('../../data/courses.json');
const chefs = require('../../data/chefs.json');

const courses = coursesJSON.map(({title,price,description, free, visible,chef}) => {
  return {
    title,
    price,
    discount : 0,
    description,
    free,
    visible,
    chefId : chefs.find(item => item.name === chef).id,
    createdAt : new Date(),
    updatedAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Courses', courses, {});
   
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Courses', null, {});
       }
};
