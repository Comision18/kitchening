const {validationResult} = require('express-validator');
const { readJSON, writeJSON } = require("../data");
const {hashSync} = require('bcryptjs')

module.exports = {
    register : (req,res) => {
        return res.render('users/register',{
            title : "Registro de usuario"
        })
    },
    processRegister : (req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            const users = readJSON('users.json')
            const {name, surname, email, password}  = req.body;

            const newUser = {
                id: users.length ? users[users.length - 1].id + 1 : 1,
                name : name.trim(),
                surname : surname.trim(),
                email : email.trim(),
                password : hashSync(password,12)

            }

            users.push(newUser);
  
            writeJSON('users.json', users);
            return res.redirect('/users/login');

        }else{
            return res.render('users/register',{
                title : "Registro de usuario",
                errors : errors.mapped(),
                old : req.body
            })
        }

    },
    login : (req,res) => {
        return res.render('users/login',{
            title : "Inicio de sesión"
        })
    },
    processLogin : (req,res) => {
        return res.send(req.body)
    },
    profile : (req,res) => {
        return res.render('users/profile',{
            title : "Perfil de usuario"
        })
    },
    update : (req,res) => {
        return res.send(req.body)
    }
}