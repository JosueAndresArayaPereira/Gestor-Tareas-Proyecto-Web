let oculto = true;

localStorage.removeItem("token");
localStorage.removeItem("data_user");

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

// Funcion que registra un usuario
function register() {
  let nombre = document.getElementById("nombre_register").value; // se toma el valor del input con el id nombre_register
  let correo = document.getElementById("correo_register").value; // se toma el valor del input con el id correo_register
  let contra = document.getElementById("contra_register").value; // se toma el valor del input con el id contra_register

  fetch("/usuario", {
    // -> se hace una peticion al servidor en la ruta /usuario
    method: "POST", // -> con el metodo POST
    headers: {
      "Content-Type": "application/json", // indicando que el contenido es de tipo json
    },
    body: JSON.stringify({ nombre, correo, contra }), // enviamos los datos del usuario en formato json pero transformados a string
  }).then((response) => {
    // cuando se reciba una respuesta
    if (response.status === 201) {
      // le preguntamos si el status de la respuesta es 201
      alert("Usuario creado con éxito"); //en ese caso mostramos un mensaje de exito
      vaciarTodasLasEntradas(); // lamamos a vaciarTodasLasEntradas para limpiar los inputs
      MostrarOcultarFormulario(); // llamamos a MostrarOcultarFormulario para ocultar el formulario de registro
    } else {
      alert("Error al crear el usuario"); // en caso de que el status no sea 201 mostramos un mensaje de error
    }
  });
}

//funcion que vacia todos los inputs
function vaciarTodasLasEntradas() {
  let inputs = document.querySelectorAll("input"); // se toman todos los inputs
  inputs.forEach((input) => {
    // se recorre cada input
    input.value = ""; // se vacia el valor del input
  });
}

function Login() {
  // funcion para logearnos
  let correo = document.getElementById("correo_login").value; // se toma el valor del input con el id correo_login
  let contra = document.getElementById("contra_login").value; // se toma el valor del input con el id contra_login

  fetch("/login", {
    // se hace una peticion al servidor en la ruta /login
    method: "POST", // indicamos que el metodo es POST
    headers: {
      // indicamos que el contenido es de tipo json
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contra }), // enviamos los datos del usuario en formato json pero transformados a string
  }).then((response) => {
    // cuando se reciba una respuesta
    if (response.status === 200) {
      // si el status de la respuesta es 200
      response.json().then((data) => {
        // convertimos la respuesta a json y la guardamos en data
        localStorage.setItem("token", data.token); // guardamos el token en el localstorage
        localStorage.setItem("data_user", correo); // guardamos el correo en el localstorage
        window.location.href = "/vista"; // redirigimos a la vista
      });
    } else {
      alert("Usuario o contraseña incorrectos"); // si el status no es 200 mostramos un mensaje de error
    }
  });
}

document.getElementById("formulario_login").addEventListener("submit", (e) => {
  // escuchar cuando el formulario de login se envie
  e.preventDefault();
  Login();
});

document
  .getElementById("formulario_register")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    register();
  });
