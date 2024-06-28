const correo = localStorage.getItem("data_user");

// Función para obtener todas las tareas
async function obtenerTodasLasTareas() {
  try {
    const response = await fetch("/tareas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ correo: correo }),
    });

    if (response.ok) {
      const data = await response.json();
      let tareas_html = "";

      data.forEach((tarea) => {
        let estado = tarea.estado;
        let clase = "tarea_" + estado.toLowerCase();
        tareas_html += `
            <article class="tarea">
                <h2>${tarea.nombre_tarea}</h2>
                <p class="descripcion_tarea">${tarea.descripcion}</p>
                <div class="fechas_tarea">
                    <p>Fecha estimada</p>
                    <p>${tarea.fecha_ESTIMADA}</p>
                </div>
                <p>Estado <span class="${clase}">${tarea.estado}</span></p>
                <button id="${tarea.id_tarea}" class="btn">Editar</button>
            </article>
        `;
      });
      document.querySelector(".mostrar_tareas").innerHTML = tareas_html;
    } else {
      alert("Error al obtener las tareas");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al obtener las tareas");
  }
}

obtenerTodasLasTareas();
