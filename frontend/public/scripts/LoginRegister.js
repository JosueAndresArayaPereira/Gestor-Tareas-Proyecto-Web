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
