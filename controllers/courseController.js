const fs = require('fs');
const {validationResult} = require('express-validator')
const { readJSON, writeJSON } = require("../data");
const chefs = readJSON('chefs.json');
const chefsSort = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

module.exports = {
  list: (req, res) => {

    const courses = readJSON('courses.json')

    return res.render("courses/list", {
      title: "Lista de cursos",
      courses: courses.filter(course => course.visible)
    });
  },
  detail: (req, res) => {
    const { id } = req.params;
    const courses = readJSON('courses.json')    
    const course = courses.find(course => course.id === +id);

    return res.render("courses/detail", {
      title: "Detalle del curso",
      ...course,
    });
  },
  add: (req, res) => {
    const chefs = readJSON('chefs.json');
    const chefsSort = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

    return res.render('courses/formAdd', {
      chefs: chefsSort
    })
  },
  store: (req, res) => {

    const errors = validationResult(req);

    if(!req.file){
      errors.errors.push({
        value : "",
        msg : "El producto debe tener una imagen",
        param : "image",
        location : "file"
      })
    }

    if(errors.isEmpty()){

      const courses = readJSON('courses.json')

      const { title, price, description, section, chef, visible } = req.body;
  
      const newCourse = {
        id: courses[courses.length - 1].id + 1,
        title : title.trim(),
        price: +price,
        description: description.trim(),
        image: req.file ? req.file.filename : null,
        chef,
        sale: section === "sale" && true,
        newest: section === "newest" && true,
        free: section === "free" && true,
        visible : visible ? true : false
      };
  
      courses.push(newCourse);
  
      writeJSON('courses.json', courses);
      return res.redirect('/courses/list');
      
    }else{

      if(req.file){
        fs.existsSync(`./public/images/courses/${req.file.filename}`) && fs.unlinkSync(`./public/images/courses/${req.file.filename}`)
      }
      
      return res.render('courses/formAdd', {
        chefs: chefsSort,
        errors : errors.mapped(),
        old : req.body
      })


    }

  },
  edit: (req, res) => {
    const { id } = req.params;
    const courses = readJSON('courses.json')

    const course = courses.find(course => course.id === +id);
    return res.render('courses/formEdit', {
      ...course,
      chefs: chefsSort
    })
  },
  update : (req,res) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
      const courses = readJSON('courses.json')

      const { title, price, description, section, chef, visible } = req.body;
      const id = +req.params.id
      const course = courses.find(course => course.id === +id);
  
      const courseUpdated = {
        id,
        title : title.trim(),
        price: +price,
        description: description.trim(),
        image: course.image,
        chef,
        sale: section === "sale" && true,
        newest: section === "newest" && true,
        free: section === "free" && true,
        visible : visible ? true : false
      };
  
      const coursesModified = courses.map(course => {
        if(course.id === id){
          return courseUpdated
        }
        return course
      });
  
  
      writeJSON('courses.json', coursesModified);
  
      return res.redirect(`/courses/detail/${id}`)
    }else{

      const { id } = req.params;
      const courses = readJSON('courses.json')
  
      const course = courses.find(course => course.id === +id);
      return res.render('courses/formEdit', {
        ...course,
        chefs: chefsSort,
        errors : errors.mapped(),
        old : req.body
      })

    }


  },
  removeConfirm : (req,res) => {
    const courses = readJSON('courses.json')

    const id = req.params.id;
    const course = courses.find(course => course.id === +id);

    return res.render('courses/confirmRemove',{
      ...course
    })
  },
  remove : (req,res) => {
    const courses = readJSON('courses.json')

    const id = req.params.id;
    const coursesModified = courses.filter(course => course.id !== +id);

    //console.log(coursesModified);
    
    /* guardar los cambios */
    writeJSON('courses.json', coursesModified);
    return res.redirect(`/courses/list`)   
  }

     

};
