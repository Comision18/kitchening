const {validationResult} = require('express-validator');
const { readJSON, writeJSON } = require("../data");
const {hashSync} = require('bcryptjs');
const db = require('../database/models');

module.exports = {
    register : (req,res) => {
        return res.render('users/register',{
            title : "Registro de usuario"
        })
    },
    processRegister : (req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            const {name, surname, email, password}  = req.body;

            db.Address.create()
                .then( address => {
                    db.User.create({
                        name : name.trim(),
                        surname : surname.trim(),
                        email : email.trim(),
                        password : hashSync(password, 10),
                        rolId : 2,
                        addressId : address.id
                    }).then(({id, name, rolId}) => {

                        req.session.userLogin = {
                            id,
                            name,
                            rol : rolId
                        };
                        return res.redirect('/');

                    })
                })
                .catch(error => console.log(error))
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
        const errors = validationResult(req);

        if(errors.isEmpty()){


            db.User.findOne({
                where : {
                    email : req.body.email
                }
            })
            .then( ({id, name, rolId}) => {

                req.session.userLogin = {
                    id,
                    name,
                    rol : rolId
                };

                if(req.body.remember){
                    res.cookie('userKitchening18',req.session.userLogin,{maxAge: 1000*60} )
               }
    
                return res.redirect('/')
            })
            .catch(error => console.log(error))

        }else{
            return res.render('users/login',{
                title : "Inicio de sesión",
                errors : errors.mapped()
            })
        }
    },
    profile : (req,res) => {
        return res.render('users/profile',{
            title : "Perfil de usuario"
        })
    },
    update : (req,res) => {
        return res.send(req.body)
    },
    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    },
    list : (req,res) => {

        db.User.findAll({
            include: ['address','rol']
        })
            .then(users => {
                return res.render('users/users',{
                    users
                })
            })
            .catch(error => console.log(error))


       
    }
}