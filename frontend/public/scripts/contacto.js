function enviarContactanos() {
  let correo = localStorage.getItem("data_user");
  let asunto = document.getElementById("asunto").value;
  let descripcion = document.getElementById("inquietud").value;
  let tipo = document.getElementById("motivo").value;
  let fecha_creacion = new Date().toISOString().slice(0, 19).replace("T", " ");

  let data = {
    correo: correo,
    asunto: asunto,
    descripcion: descripcion,
    tipo: tipo,
    fecha_creacion: fecha_creacion,
  };

  fetch("/contactanos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(function (response) {
      if (response.ok) {
        alert("Mensaje enviado correctamente");
        window.location.href = "/vista";
      } else {
        alert("Error al enviar el mensaje");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Error al enviar el mensaje");
    });
}

document
  .getElementById("agregar_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    enviarContactanos();
  });
