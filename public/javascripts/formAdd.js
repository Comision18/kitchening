console.log('formAdd.js success!!');

    /* capturar elemntos del formulario */
    const $ = id => document.getElementById(id)
    const formAddProduct = $('form-add-product')
    const inputTitle = $('title');
    const inputPrice = $('price');
    const inputDiscount = $('discount');
    const textAreaDescription = $('description');
    const selectChef = $('chef');
    const selectCategory = $('category');
    const inputImages = $('images');


    const msgError = (element, message, { target }) => {
      $(element).innerHTML = message
      target.classList.add('is-invalid')
    }

    const cleanError = (element, { target }) => {
      target.classList.remove('is-invalid')
      target.classList.remove('is-valid')
      $(element).innerHTML = null
    }

    inputTitle.addEventListener('blur', function (event) {
      switch (true) {
        case !this.value.trim():
          msgError('titleError', "El título del curso es obligatorio", event)
          break;
        case this.value.trim().length < 10:
          msgError('titleError', "El título debe tener mínimo 10 caracteres", event)
          break;
        default:
          this.classList.add('is-valid')
          break;
      }
    })

    inputTitle.addEventListener('focus', function (event) {
      cleanError('titleError', event)
    })


    inputPrice.addEventListener('blur', function (event) {
      switch (true) {
        case !this.value.trim():
          msgError('priceError', "El precio es requerido", event)
          break;
        case this.value < 0:
          msgError('priceError', "Solo números positivos", event)
          break;
        default:
          this.classList.add('is-valid')
          break;
      }
    })

    inputPrice.addEventListener('focus', function () {
      cleanError('priceError', event)
    })

    inputDiscount.addEventListener('blur', function (event) {
      if (this.value < 0) {
        msgError('discountError', "Solo números positivos", event)
      } else {
        this.classList.add('is-valid')
      }
    })

    inputDiscount.addEventListener('focus', function () {
      cleanError('discountError', event)
    })


    selectChef.addEventListener('blur', function (event) {
      if (!this.value) {
        msgError('chefError', "Debes indicar un chef", event)
      } else {
        this.classList.add('is-valid')
      }
    })

    selectChef.addEventListener('focus', function () {
      cleanError('chefError', event)
    })

    selectCategory.addEventListener('blur', function (event) {
      if (!this.value) {
        msgError('categoryError', "Debes indicar una categoría", event)
      } else {
        this.classList.add('is-valid')
      }
    })

    selectCategory.addEventListener('focus', function () {
      cleanError('categoryError', event)
    })

    textAreaDescription.addEventListener('blur', function (event) {
      switch (true) {
        case !this.value.trim():
          msgError('descriptionError', "La descripción es requerida", event)
          break;
        case this.value.trim().length < 20:
          msgError('descriptionError', "Mínimo 20 caracteres", event)
          break;
        case this.value.trim().length > 500:
          msgError('descriptionError', "Máximo 500 caracteres", event)
          break;
        default:
          this.classList.add('is-valid')
          break;
      }
    })

    /* contador de caracteres */
    let maxCharacters = 500;
    let numberCharacters = 500;

    textAreaDescription.addEventListener('focus', function (event) {
      cleanError('descriptionError', event)
    })

    let textValid;

    textAreaDescription.addEventListener("keyup", function (event) {
      if (textValid && event.key !== 'Backspace') {
        this.value = textValid
        msgError('descriptionError', "Máximo 500 caracteres", event)
        return null
      }
      numberCharacters = maxCharacters - +this.value.length;

      $('numberCharacters').innerHTML = numberCharacters;

      if (numberCharacters === 0) {
        textValid = this.value.trim()
      } else {
        textValid = null
      }

      if (numberCharacters <= 0) {
        $('descriptionInfo').hidden = true;
        msgError('descriptionError', "Máximo 500 caracteres", event)
      } else {
        $('descriptionInfo').hidden = false;
        cleanError('descriptionError', event)
      }

    })

    /* 
function limitText() {
var input = document.getElementById("myInput");
if (input.value.length > 500) {
  input.value = input.value.substring(0, 500);
}
}            Si el número de caracteres en el input supera los 500 caracteres, la función corta el texto a los primeros 500 caracteres y los muestra en el input. Esto significa que el usuario no podrá escribir más de 500 caracteres, pero podrá borrar caracteres si desea hacerlo.
*/

    const regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

    inputImages.addEventListener('change', function (e) {
      $('btnImages').innerText = "Agregar imágenes"
      switch (true) {
        case !regExExt.exec(this.value):
          $('imagesError').innerHTML = "Solo se admiten imágenes jpg | jpeg | png | gif | webp"
          $('boxImagesPreview').innerHTML = null;

          break;
        case this.files.length > 3: $
          $('imagesError').innerHTML = "Máximo 3 imágenes"
          $('boxImagesPreview').innerHTML = null;

          break;

        default:             
          cleanError('imagesError', event);
        $('btnImages').innerText = "Cambiar imágenes";
        $('btnImages').classList.remove('btn-danger')
          if(this.files){
            [].forEach.call(this.files,readAndPreview);
          }

          function readAndPreview(file) {
            let reader = new FileReader()
            $('boxImagesPreview').innerHTML = null;
            reader.addEventListener('load', function(){
              let image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              $('boxImagesPreview').appendChild(image)
            })
            reader.readAsDataURL(file)
          }


          break;
      }
    })

    formAddProduct.addEventListener('submit', function (event) {
      event.preventDefault();
      let error = false;
      for (let i = 0; i < this.elements.length - 3; i++) {

        if (!this.elements[i].value || this.elements[i].classList.contains('is-invalid')) {
          error = true
        }

      }

      if (!error) {
        this.submit()
      } else {
        for (let i = 0; i < this.elements.length - 3; i++) {

          !this.elements[i].value && this.elements[i].classList.add('is-invalid')

          if(this.elements[i].id === "images" && this.elements[i].files.length === 0 ){
            
            $('btnImages').classList.add('btn-danger')
          } 

        }
        $('formError').innerHTML = "Los campos señalados son obligatorios."
      }

    })
