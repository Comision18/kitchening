const db = require("../database/models");
const { literalQueryUrlImage, literalQueryUrl } = require("../helpers");

const getAllCourses = async (
  req,
  { withPagination = "false", page = 1, limit = 6 }
) => {
  try {
    let options = {
      include: [
        {
          association: "images",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "id",
              "courseId",
              "name",
              "chefId",
            ],
            include: [
              literalQueryUrlImage(req, "courses", "images.name", "urlImage"),
            ],
          },
        },
        {
          association: "chef",
        },

        {
          association: "usersFavorites",
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
        count: total,
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
};
const getCourseById = async (req, id) => {
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
            include: [literalQueryUrlImage(req, "chefs", "photo", "urlPhoto")],
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
};
const getCountCourses = async () => {
  try {
    const totalCourses = await db.Course.count();

    return totalCourses;
  } catch (error) {
    console.log(error);
    throw {
      status: 500,
      message: error.message,
    };
  }
};
const storeCourse = async (req) => {
  try {
    const {
      title,
      price,
      discount,
      description,
      chefId,
      categoryId,
      visible,
      free,
    } = req.body;

    const newCourse = await db.Course.create({
      title : title.trim(),
      price,
      discount,
      description : description.trim(),
      chefId,
      categoryId,
      visible,
      free,
    });

    
    const files = [];

    console.log(req.files)

    for (const key in req.files) {
      files.push(req.files[key][0].filename);
    };

    files.forEach(async (filename,index) => {
      await db.Image.create({
        name : filename,
        courseId : newCourse.id,
        primary : index === 0 ? true : false
      })
    });

    const course = await getCourseById(req,newCourse.id);

    return course

  } catch (error) {
    console.log(error);
    throw {
      status: 500,
      message: error.message,
    };
  }
};

const updateCourse = async (req) => {
  try {

    const {
      title,
      price,
      discount,
      description,
      chefId,
      categoryId,
      visible,
      free,
    } = req.body;

    await db.Course.update(
      {
        title : title.trim(),
        price,
        discount,
        description : description.trim(),
        chefId,
        categoryId,
        visible,
        free,
      },
      {
        where : {
          id : req.params.id
        }
      }
    )

    const course = await getCourseById(req,req.params.id);

    return course
    
  } catch (error) {
    console.log(error);
    throw {
      status: 500,
      message: error.message,
    };
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  getCountCourses,
  storeCourse,
  updateCourse
};
