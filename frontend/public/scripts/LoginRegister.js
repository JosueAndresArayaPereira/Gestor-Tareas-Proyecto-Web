let oculto = true;

// Funcion que muestra u oculta el formulario de login y register
function MostrarOcultarFormulario() {
  let loginForm = document.getElementById("formulario_login");
  let registerForm = document.getElementById("formulario_register");

  if (oculto) {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
  } else {
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
  }
  oculto = !oculto;
}

// se toma todos los elementos con el id form_link y se les agrega un evento click
// que ejecuta la funcion MostrarOcultarFormulario
document.querySelectorAll("#form_link").forEach((link) => {
  link.addEventListener("click", () => {
    MostrarOcultarFormulario();
  });
});

function register() {
  let nombre = document.getElementById("nombre_register").value;
  let correo = document.getElementById("correo_register").value;
  let contra = document.getElementById("contra_register").value;

  fetch("/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, correo, contra }),
  }).then((response) => {
    if (response.status === 201) {
      alert("Usuario creado con éxito");
      vaciarTodasLasEntradas();
      MostrarOcultarFormulario();
    } else {
      alert("Error al crear el usuario");
    }
  });
}

function vaciarTodasLasEntradas() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

function Login() {
  let correo = document.getElementById("correo_login").value;
  let contra = document.getElementById("contra_login").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contra }),
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        localStorage.setItem("token", data.token);
        window.location.href = "/vista";
      });
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
}

document.getElementById("formulario_login").addEventListener("submit", (e) => {
  e.preventDefault();
  Login();
});

document
  .getElementById("formulario_register")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    register();
  });
