const courses = require('../data/courses.json')

module.exports = {
  list: (req, res) => {
    return res.render("courses/list",{
      title : "Lista de cursos",
      courses
    });
  },
  detail: (req, res) => {
    const { id } = req.params;

    const course = courses.find(course => course.id === +id)

    return res.render("courses/detail", {
        title : "Detalle del curso",
        course,
    });
  },
};
