//obtener el id que esta como parametro en la url
let url = new URLSearchParams(location.search);
let id = url.get("id");
obtenerTarea(id);

function modificarTarea() {
  let nombre_tarea = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let fecha_ESTIMADA = document.getElementById("fecha_estimada").value;
  let estado = document.getElementById("estado").value;
  let tarea = {
    id_tarea: id,
    nombre_tarea: nombre_tarea,
    descripcion: descripcion,
    fecha_ESTIMADA: fecha_ESTIMADA,
    estado: estado,
  };
  fetch("/tarea", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(tarea),
  })
    .then((response) => {
      if (response.ok) {
        alert("Tarea modificada con éxito");
        window.location.href = "/vista";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//funcion para obtener la tarea
async function obtenerTarea(id) {
  try {
    const response = await fetch(`/tarea?id_tarea=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById("titulo").value = data.nombre_tarea;
      document.getElementById("descripcion").value = data.descripcion;
      document.getElementById("fecha_estimada").value = data.fecha_ESTIMADA;
      document.getElementById("estado").value = data.estado;
    } else {
      console.log("Error: " + response.statusText);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function eliminarTarea() {
  fetch("/tarea", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id_tarea: id }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Tarea eliminada con éxito");
        window.location.href = "/vista";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

document
  .getElementById("modificar_tarea")
  .addEventListener("click", modificarTarea);

document
  .getElementById("eliminar_tarea")
  .addEventListener("click", eliminarTarea);
