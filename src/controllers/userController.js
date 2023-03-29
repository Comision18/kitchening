const fs = require('fs');
const {validationResult} = require('express-validator');
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
        db.User.findByPk(req.session.userLogin.id,{
            attributes : ['name','surname','email','image'],
            include : [
                {
                    association : 'address',
                    attributes : ['address','city','province','zipCode']
                }
            ],

        })
            .then(user => {
                return res.render('users/profile',{
                    title : "Perfil de usuario",
                    user
                })
            })
            .catch(error => console.log(error))

      
    },
    update : (req,res) => {

        const {name, surname, address, city, province, zipCode} = req.body 
        const {id} = req.session.userLogin;

       db.User.findByPk(id)
            .then(user => {
                const addressUpdate = db.Address.update(
                    {
                        address : address ? address.trim() : null,
                        city : city ? city.trim() : null,
                        province: province ? province.trim() : null,
                        zipCode : zipCode ? zipCode : null
                    },
                    {
                        where : {
                            id : user.addressId
                        }
                    }
                )
                const userUpdate = db.User.update(
                    {
                        name : name.trim(),
                        surname : surname.trim(),
                        image : req.file ? req.file.filename : user.image
                    },
                    {
                        where : {
                            id
                        }
                    }
                )

                Promise.all(([addressUpdate, userUpdate]))
                    .then( ()=> {

                        (req.file && fs.existsSync('public/images/users/' + user.image)) && fs.unlinkSync('public/images/users/' + user.image)

                        req.session.message = "Datos actualizados"
                        return res.redirect('/users/profile')
                    })
            }).catch(error => console.log(error))
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