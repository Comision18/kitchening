const fs = require("fs");
const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../data");
const chefs = readJSON("chefs.json");
const chefsSort = chefs.sort((a, b) =>
  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
);

const db = require("../database/models");

module.exports = {
  list: (req, res) => {
    db.Course.findAll({
      where: {
        visible: true,
      },
      include: ["images"],
    })
      .then((courses) => {
        return res.render("courses/list", {
          title: "Lista de cursos",
          courses,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    const { id } = req.params;

    db.Course.findByPk(id, {
      include: [
        {
          association: "images",
          attributes: ["name", "primary"],
        },
        {
          association: "chef",
          attributes: ["name"],
        },
      ],
    })
      .then((course) => {
        //return res.send(course)
        return res.render("courses/detail", {
          title: "Detalle del curso",
          ...course.dataValues,
          imgPrimary: course.images.find((image) => image.primary),
        });
      })
      .catch((error) => console.log(error));
  },
  add: (req, res) => {
    const chefs = db.Chef.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    const categories = db.Category.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    Promise.all([chefs, categories])
      .then(([chefs, categories]) => {
        return res.render("courses/formAdd", {
          chefs,
          categories,
        });
      })
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
    const errors = validationResult(req);

    if (!req.files.length && !req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: "El producto debe tener por lo menos una imagen",
        param: "images",
        location: "files",
      });
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files",
      });
    }

    if (errors.isEmpty()) {
      const {
        title,
        price,
        discount,
        description,
        chef,
        category,
        visible,
        free,
      } = req.body;

      db.Course.create({
        title: title.trim(),
        price,
        discount,
        description: description.trim(),
        chefId: chef,
        categoryId: category,
        free: free ? true : false,
        visible: visible ? true : false,
      })
        .then((course) => {
          req.files.forEach((image, index) => {
            db.Image.create({
              name: image.filename,
              courseId: course.id,
              primary: index === 0 ? true : false,
            });
          });

          return res.redirect("/courses/list");
        })
        .catch((error) => console.log(error));
    } else {
      const chefs = db.Chef.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });

      const categories = db.Category.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });

      if (req.files.length) {
        req.files.forEach((file) => {
          fs.existsSync(`./public/images/courses/${file.filename}`) &&
            fs.unlinkSync(`./public/images/courses/${file.filename}`);
        });
      }

      Promise.all([chefs, categories])
        .then(([chefs, categories]) => {
          return res.render("courses/formAdd", {
            chefs,
            categories,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
  },
  edit: (req, res) => {
    const { id } = req.params;

    const course = db.Course.findByPk(id, {
      include: ["images"],
    });

    const chefs = db.Chef.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    const categories = db.Category.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    Promise.all([chefs, categories, course])
      .then(([chefs, categories, course]) => {
        return res.render("courses/formEdit", {
          chefs,
          categories,
          ...course.dataValues,
        });
      })
      .catch((error) => console.log(error));
  },
  update: (req, res) => {
    const errors = validationResult(req);

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files",
      });
    }

    if (errors.isEmpty()) {
      const {
        title,
        price,
        discount,
        description,
        chef,
        category,
        visible,
        free,
        primary,
      } = req.body;

      const id = +req.params.id;

      db.Course.update(
        {
          title: title.trim(),
          price,
          discount,
          description: description.trim(),
          chefId: chef,
          categoryId: category,
          free: free ? true : false,
          visible: visible ? true : false,
        },
        {
          where: {
            id,
          },
        }
      ).then(() => {

        db.Image.update(
          {
            primary: 0,
          },
          {
            where: {
              courseId: id,
            },
          }
        ).then(() => {
          db.Image.update(
            {
              primary: true,
            },
            {
              where: {
                id: primary,
              },
            }
          ).then(() => {
            return res.redirect(`/admin`);
            /*  if (req.files.length) {
                         course.images.forEach((image) => {
                           fs.existsSync(`./public/images/courses/${image}`) &&
                             fs.unlinkSync(`./public/images/courses/${image}`);
                         });
                       } */
          })
        })
      }).catch(error => console.log(error))



    } else {
      const { id } = req.params;

      if (req.files.length) {
        req.files.forEach((file) => {
          fs.existsSync(`./public/images/courses/${file.filename}`) &&
            fs.unlinkSync(`./public/images/courses/${file.filename}`);
        });
      }
      const course = db.Course.findByPk(id, {
        include: ["images"],
      });

      const chefs = db.Chef.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });

      const categories = db.Category.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });

      Promise.all([chefs, categories, course])
        .then(([chefs, categories, course]) => {
          return res.render("courses/formEdit", {
            chefs,
            categories,
            ...course.dataValues,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
  },
  remove: (req, res) => {
    const courses = readJSON("courses.json");

    const id = req.params.id;
    const coursesModified = courses.filter((course) => course.id !== +id);

    //console.log(coursesModified);

    /* guardar los cambios */
    writeJSON("courses.json", coursesModified);
    return res.redirect(`/courses/list`);
  },
  search: (req, res) => {
    return res.render("courses/results", {
      courses: [],
    });
  },
};
