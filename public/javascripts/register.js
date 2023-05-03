const $ = (id) => document.getElementById(id);

const msgError = (element, message, { target }) => {
    $(element).innerHTML = message
    target.classList.add('is-invalid')
  }

  const cleanError = (element, { target }) => {
    target.classList.remove('is-invalid')
    target.classList.remove('is-valid')
    $(element).innerHTML = null
  }

let regExLetter = /^[A-Z]+$/i;
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExPass2 = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,12}$/; //mayuscula, numero, especial y 6 a 12 caracteres

$('name').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('error-name',"El nombre es obligatorio",e)
            break;
        case this.value.trim().length < 2 || this.value.trim().length > 50 :
            msgError('error-name',"Mímino 2 y máximo 50 caracteres",e)
            break
        case !regExLetter.test(this.value.trim()):
            msgError('error-name',"Solo caracteres alfabéticos",e)
            break
    
        default:
            this.classList.add('is-valid')
            break;
    }
})

$('name').addEventListener('focus',function(e){
    cleanError('error-name',e)
})


$('surname').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('error-surname',"El apellido es obligatorio",e)
            break;
        case this.value.trim().length < 2 || this.value.trim().length > 50 :
            msgError('error-surname',"Mímino 2 y máximo 50 caracteres",e)
            break
        case !regExLetter.test(this.value.trim()):
            msgError('error-surname',"Solo caracteres alfabéticos",e)
            break
    
        default:
            this.classList.add('is-valid')
            break;
    }
})

$('surname').addEventListener('focus',function(e){
    cleanError('error-surname',e)
});


$('email').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('error-email',"El email es obligatorio",e)
            break;
        case !regExEmail.test(this.value.trim()):
            msgError('error-email',"Tiene que ser un email válido",e)
            break
    
        default:
            this.classList.add('is-valid')
            break;
    }
})

$('email').addEventListener('focus',function(e){
    cleanError('error-email',e)
});

$('password').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('error-password',"El password es obligatorio",e)
            break;
        case !regExPass.test(this.value.trim()):
            msgError('error-password',"Debe ser entre 6 y 12 caracteres y tener una mayúscula, una minúscula y un número",e)
            break
        default:
            this.classList.add('is-valid')
            break;
    }
})

$('password').addEventListener('focus',function(e){
    cleanError('error-password',e)
});

$('password2').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('error-password2',"Debes confirmar el password",e)
            break;
        case this.value.trim()!== $('password').value.trim():
            msgError('error-password2',"La confirmación no coincide",e)
            break
        default:
            this.classList.add('is-valid')
            break;
    }
})

$('password2').addEventListener('focus',function(e){
    cleanError('error-password2',e)
});

