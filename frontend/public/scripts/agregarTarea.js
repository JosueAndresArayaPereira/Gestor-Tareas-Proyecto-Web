document.getElementById("agregar_form").addEventListener("submit", (e) => {
  // se agrega un evento al formulario con el id agregar_form
  e.preventDefault(); // se previene el comportamiento por defecto del formulario
  let nombre_tarea = document.getElementById("nombre_tarea").value; // se toma el valor del input con el id nombre_tarea
  let descripcion = document.getElementById("descripcion_tarea").value; // se toma el valor del input con el id descripcion_tarea
  let correo = localStorage.getItem("data_user");
  let fecha_ESTIMADA = document.getElementById("fecha_estimada").value;
  let estado = "Pendiente";
  fetch("/tarea", {
    // se hace una peticion al servidor en la ruta /tarea
    method: "POST", // indicamos que el metodo es POST
    headers: {
      // indicamos que el contenido es de tipo json
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      correo,
      nombre_tarea,
      descripcion,
      fecha_ESTIMADA,
      estado,
    }), // enviamos los datos de la tarea en formato json pero transformados a string
  }).then((response) => {
    // cuando se reciba una respuesta
    if (response.status === 201) {
      // si el status de la respuesta es 201
      alert("Tarea creada con éxito"); // mostramos un mensaje de exito
      window.location.href = "/vista"; // redirigimos a la vista
    } else {
      alert("Error al crear la tarea"); // si el status no es 201 mostramos un mensaje de error
    }
  });
});
