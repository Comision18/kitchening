const db = require("../database/models");
const { literalQueryUrlImage, literalQueryUrl } = require("../helpers");

module.exports = {
  getAllCourses: async (req, { withPagination = "false", page = 1, limit = 6 }) => {
    try {
      let options = {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "courseId", "name","chefId"],
              include: [
                literalQueryUrlImage(req, "courses", "name", "urlImage"),
              ],
            },
          
          },
          {
            association : "chef"
          },
        ],
        attributes: {
          include: [literalQueryUrl(req, "courses", "Course.id")],
        },
      };

      if (withPagination === "true") {
        options = {
          ...options,
          page,
          paginate: limit,
        };

        const { docs, pages, total } = await db.Course.paginate(options);

        return {
          courses: docs,
          pages,
          count: total
        };
      }

      const { count, rows: courses } = await db.Course.findAndCountAll(options);
      return {
        count,
        courses,
      };
    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  getCourseById: async (req, id) => {
    try {
      const course = await db.Course.findByPk(id, {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "courseId", "name"],
              include: [
                literalQueryUrlImage(req, "courses", "images.name", "urlImage"),
              ],
            },
          },
          {
            association: "chef",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "photo"],
              include: [
                literalQueryUrlImage(req, "chefs", "photo", "urlPhoto"),
              ],
            },
          },
        ],
      });
      return course;
    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  getCountCourses : async () => {
    try {

      const totalCourses = await db.Course.count();

      return totalCourses
      
    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  }
};
