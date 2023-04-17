const {check} = require('express-validator');

module.exports = [

    check('title')
        .notEmpty().withMessage('El título del curso es obligatorio').bail()
        .isLength({min:5,max:50}).withMessage('El título debe tener entre 5 y 50 caracteres'),

    check('price')
        .notEmpty().withMessage('Debes indicar un precio').bail()
        .isInt({min:1}).withMessage('Solo números positivos'),

    check('chef')
        .notEmpty().withMessage('¿Quién es el chef?'),

    check('category')
        .notEmpty().withMessage('¿Y la categoría???'),

    check('description')
        .notEmpty().withMessage('La descripción del curso es requerida').bail()
        .isLength({min:20,max:500}).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
    
]