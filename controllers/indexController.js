const courses = require('../data/courses.json');

module.exports = {
    home : (req, res) => {
        /* toda la lógica!!! */
        const newCourses = courses.filter(course => course.newest);
        const saleCourses = courses.filter(course => course.sale);

        return res.render('home',{
          title : "Kitchening | HOME",
          courses,
          newCourses,
          saleCourses
        });
      }
}