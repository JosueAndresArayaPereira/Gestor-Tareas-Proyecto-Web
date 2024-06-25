let oculto = true;

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

document.querySelectorAll("#form_link").forEach((link) => {
  link.addEventListener("click", () => {
    MostrarOcultarFormulario();
  });
});
