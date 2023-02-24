const {check, body} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Mínimo dos letras').bail()
        .isAlpha().withMessage('Solo caracteres alfabéticos'),

    check('surname')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Mínimo dos letras').bail()
        .isAlpha().withMessage('Solo caracteres alfabéticos'),

    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email con formato válido'),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min: 6,
            max : 12
        }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    
    body('password2')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
        .custom((value,{req})=> {
            if(value !== req.body.password ){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden')
        
    
    ]