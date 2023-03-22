const fs = require('fs');
const {validationResult} = require('express-validator')
const { readJSON, writeJSON } = require("../data");
const chefs = readJSON('chefs.json');
const chefsSort = chefs.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

const db = require('../database/models');

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

    if(!req.files.length && !req.fileValidationError){
      errors.errors.push({
        value : "",
        msg : "El producto debe tener por lo menos una imagen",
        param : "images",
        location : "files"
      })
    }

    
/*     if(req.files.length > 3){
      errors.errors.push({
        value : "",
        msg : "Solo se aceptan hasta 3 archivos",
        param : "images",
        location : "files"
      })
    } */

    if(req.fileValidationError){
      errors.errors.push({
        value : "",
        msg : req.fileValidationError,
        param : "images",
        location : "files"
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
        images: req.files.map(file => file.filename),
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

      if(req.files.length){
        req.files.forEach(file => {
          fs.existsSync(`./public/images/courses/${file.filename}`) && fs.unlinkSync(`./public/images/courses/${file.filename}`);
        });
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

    if(req.fileValidationError){
      errors.errors.push({
        value : "",
        msg : req.fileValidationError,
        param : "images",
        location : "files"
      })
    }

    if(errors.isEmpty()){
      const courses = readJSON('courses.json')

      const { title, price, description, section, chef, visible } = req.body;
      const id = +req.params.id
  
      const coursesModified = courses.map(course => {
        if(course.id === id){

          const courseUpdated = {
            id,
            title : title.trim(),
            price: +price,
            description: description.trim(),
            images: req.files.length ? req.files.map(file => file.filename) : course.images,
            chef,
            sale: section === "sale" && true,
            newest: section === "newest" && true,
            free: section === "free" && true,
            visible : visible ? true : false
          };

          if(req.files.length){
            course.images.forEach(image => {
              fs.existsSync(`./public/images/courses/${image}`) && fs.unlinkSync(`./public/images/courses/${image}`)
            });
          }

          return courseUpdated
        }
        return course
      });
  
  
      writeJSON('courses.json', coursesModified);
  
      return res.redirect(`/courses/detail/${id}`)
    }else{

      const { id } = req.params;
      const courses = readJSON('courses.json');

      if(req.files.length){
        req.files.forEach(file => {
          fs.existsSync(`./public/images/courses/${file.filename}`) && fs.unlinkSync(`./public/images/courses/${file.filename}`)

        });
      }
  
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
  },
  search : (req,res) => {
    return res.render('courses/results',{
      courses : []
    })
  }

     

};
