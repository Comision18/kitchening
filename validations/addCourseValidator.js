const {check} = require('express-validator');

module.exports = [

    check('title')
        .notEmpty().withMessage('El título del curso es obligatorio').bail()
        .isLength({min:5,max:20}).withMessage('El título debe tener entre 5 y 20 caracteres'),

    check('price')
        .notEmpty().withMessage('Debes indicar un precio').bail()
        .isInt({min:1}).withMessage('Solo números positivos'),

    check('chef')
        .notEmpty().withMessage('¿Quién es el chef?'),

    check('description')
        .notEmpty().withMessage('La descripción del curso es requerida').bail()
        .isLength({min:20,max:80}).withMessage('La descripción debe tener entre 20 y 80 caracteres'),
    
    check('section')
        .notEmpty().withMessage('¿A qué sección pertenece?'),


]