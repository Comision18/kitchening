const $ = (id) => document.getElementById(id);

const msgError = (element, message, { target }) => {
  $(element).innerHTML = message;
  target.classList.add("is-invalid");
};

const cleanError = (element, { target }) => {
  target.classList.remove("is-invalid");
  target.classList.remove("is-valid");
  $(element).innerHTML = null;
};

const checkedFields = () => {
  const elements = $("formRegister").elements;
  $("error-form").innerHTML = null;

  for (let i = 0; i < elements.length - 2; i++) {
    if (elements[i].classList.contains("is-invalid")) {
      $("error-form").innerHTML = "Hay campos con errores o están vacíos";
    }
  }
};

const verifyEmail = async (email) => {
    try {

        let response = await fetch("/api/users/verify-email",{
            method: "POST",
            body : JSON.stringify({
                email : email
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });

        let result = await response.json();

       return result.data.existUser
        
    } catch (error) {
        console.error
    }
}

let regExLetter = /^[A-Z]+$/i;
let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExPass2 =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{6,12}/;

$("name").addEventListener("blur", function (e) {
  switch (true) {
    case !this.value.trim():
      msgError("error-name", "El nombre es obligatorio", e);
      break;
    case this.value.trim().length < 2 || this.value.trim().length > 50:
      msgError("error-name", "Mímino 2 y máximo 50 caracteres", e);
      break;
    case !regExLetter.test(this.value.trim()):
      msgError("error-name", "Solo caracteres alfabéticos", e);
      break;

    default:
      this.classList.add("is-valid");
      checkedFields();
      break;
  }
});

$("name").addEventListener("focus", function (e) {
  cleanError("error-name", e);
});

$("surname").addEventListener("blur", function (e) {
  switch (true) {
    case !this.value.trim():
      msgError("error-surname", "El apellido es obligatorio", e);
      break;
    case this.value.trim().length < 2 || this.value.trim().length > 50:
      msgError("error-surname", "Mímino 2 y máximo 50 caracteres", e);
      break;
    case !regExLetter.test(this.value.trim()):
      msgError("error-surname", "Solo caracteres alfabéticos", e);
      break;

    default:
      this.classList.add("is-valid");
      checkedFields();
      break;
  }
});

$("surname").addEventListener("focus", function (e) {
  cleanError("error-surname", e);
});

$("email").addEventListener("blur", async function (e) {
  switch (true) {
    case !this.value.trim():
      msgError("error-email", "El email es obligatorio", e);
      break;
    case !regExEmail.test(this.value.trim()):
      msgError("error-email", "Tiene que ser un email válido", e);
      break;
    case await verifyEmail(this.value.trim()) :
        msgError("error-email", "El email ya se encuentra registrado",e)
    break
    default:
      this.classList.add("is-valid");
      checkedFields();
      break;
  }
});

$("email").addEventListener("focus", function (e) {
  cleanError("error-email", e);
});

$("password").addEventListener("blur", function (e) {
  $("msgPassword").hidden = true;

  switch (true) {
    case !this.value.trim():
      msgError("error-password", "El password es obligatorio", e);
      break;
    case !regExPass2.test(this.value.trim()):
      msgError(
        "error-password",
        "Debe ser entre 6 y 12 caracteres y tener una mayúscula, una minúscula, carácter especial y un número",
        e
      );
      break;
    default:
      this.classList.add("is-valid");
      checkedFields();
      break;
  }
});

$("password").addEventListener("focus", function (e) {
  cleanError("error-password", e);
  $("msgPassword").hidden = false;
});

const exRegs = {
  exRegMayu: /[A-Z]/,
  exRegMinu: /[a-z]/,
  exRegNum: /[0-9]/,
  exRegEsp: /[$@!%*?&_-]/,
  exRegMin: /.{6,}/,
  exRegMax: /.{13}/,
};

const validPassword = (element, exReg, value) => {
  if (!exReg.test(value)) {
    $(element).classList.add("text-danger");
  } else {
    $(element).classList.add("text-success");
    $(element).classList.remove("text-danger");
  }
};

const validMaxPassword = (element, exReg, value) => {
  if (exReg.test(value)) {
    $(element).classList.add("text-danger");
  } else {
    $(element).classList.add("text-success");
    $(element).classList.remove("text-danger");
  }
};

$("password").addEventListener("keyup", function () {
  validPassword("mayu", exRegs.exRegMayu, this.value);
  validPassword("minu", exRegs.exRegMinu, this.value);
  validPassword("num", exRegs.exRegNum, this.value);
  validPassword("esp", exRegs.exRegEsp, this.value);
  validPassword("min", exRegs.exRegMin, this.value);
  validMaxPassword("max", exRegs.exRegMax, this.value);
});

$("password2").addEventListener("blur", function (e) {
  switch (true) {
    case !this.value.trim():
      msgError("error-password2", "Debes confirmar el password", e);
      break;
    case this.value.trim() !== $("password").value.trim():
      msgError("error-password2", "La confirmación no coincide", e);
      break;
    default:
      this.classList.add("is-valid");
      checkedFields();
      break;
  }
});

$("password2").addEventListener("focus", function (e) {
  cleanError("error-password2", e);
});

$("terms").addEventListener("click", function (e) {
  this.classList.remove("is-invalid");
  $("error-terms").innerHTML = null;
});

$("formRegister").addEventListener("submit", function (e) {
  e.preventDefault();
  let error = false;

  if (!$("terms").checked) {
    error = true;
    $("error-terms").innerHTML = "Debes aceptar las bases y condiciones";
    $("terms").classList.add("is-invalid");
  }

  for (let i = 0; i < this.elements.length - 2; i++) {
    if (
      !this.elements[i].value.trim() ||
      this.elements[i].classList.contains("is-invalid")
    ) {
      error = true;
      this.elements[i].classList.add("is-invalid");
      $("error-form").innerHTML = "Hay campos con errores o están vacíos";
    }
  }

  !error && this.submit();
});
