const fs = require('fs');
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
            exclude: ["createdAt", "updatedAt", "courseId", "name"],
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

  console.log(req.files);
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
      image_1,
      image_2,
      image_3,
      image_1_id,
      image_2_id,
      image_3_id,
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


    if(image_1 === "null" && image_1_id !== "null"){
      const image = await db.Image.findByPk(image_1_id);
      fs.existsSync(`public/images/courses/${image.name}`) && fs.unlinkSync(`public/images/courses/${image.name}`)
      image.destroy()
    };
    if(image_2 === "null" && image_2_id !== "null"){
      const image = await db.Image.findByPk(image_2_id);
      fs.existsSync(`public/images/courses/${image.name}`) && fs.unlinkSync(`public/images/courses/${image.name}`)
      image.destroy()
    };
    if(image_3 === "null" && image_3_id !== "null"){
      const image = await db.Image.findByPk(image_3_id);
      fs.existsSync(`public/images/courses/${image.name}`) && fs.unlinkSync(`public/images/courses/${image.name}`)
      image.destroy()
    };

    const files = [];

    for (const key in req.files) {
      files.push({
        filename : req.files[key][0].filename,
        fieldname : req.files[key][0].fieldname,
        id : req.body[`${req.files[key][0].fieldname}_id` || null]
      })
    }

    files.forEach(async (file) => {
      if(file.id !== "null"){
        const image = await db.Image.findByPk(file.id);
        fs.existsSync(`public/images/courses/${image.name}`) && fs.unlinkSync(`public/images/courses/${image.name}`)
        image.name = file.filename;
        image.primary = file.fieldname === "image_1" ? true : false;
        image.save()
      }else{
        await db.Image.create({
          name : file.filename,
          courseId : req.params.id,
          primary : file.fieldname === "image_1" ? true : false
        })
      }
    })

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

const deleteCourse = async (req) => {
  try {
    
    const course = await db.Course.findByPk(req.params.id,{
      include : ['images']
    });

    course.images.forEach(image => {
      fs.existsSync(`public/images/courses/${image.name}`) && fs.unlinkSync(`public/images/courses/${image.name}`)
    });

    const result = await course.destroy();

    return result

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
  updateCourse,
  deleteCourse
};
