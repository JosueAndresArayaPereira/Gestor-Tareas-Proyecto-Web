import { Router } from "express";
import {
  setUsuario,
  getUsuarios,
  obtenerUsuarioYVerificarContra,
  setContactanos,
  getTareas,
  setTarea,
  obtenerIdUsuario,
} from "../db/bdLogica.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/vista", (req, res) => {
  res.render("tareasVista");
});

router.get("/tareaModificar", (req, res) => {
  res.render("modificar");
});

router.get("/tareaAgregar", (req, res) => {
  res.render("agregar");
});

router.get("/contactanos", (req, res) => {
  res.render("contactanos");
});

// Endpoint para agregar un nuevo usuario
router.post("/usuario", async (req, res) => {
  const usuario = req.body;
  const result = await setUsuario(usuario);
  if (result) {
    res.status(201).send("Usuario creado con éxito");
  } else {
    res.status(500).send("Error al crear el usuario");
  }
});

// Endpoint para obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
  const result = await getUsuarios();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(500).send("Error al obtener los usuarios");
  }
});

// Endpoint para obtener un usuario por correo
router.get("/usuario", async (req, res) => {
  const correo = req.body.correo;
  const contra = req.body.contra;
  const result = await obtenerUsuarioYVerificarContra(correo, contra);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

// Endpoint para agregar un comentario en contactanos
router.post("/contactanos", async (req, res) => {
  const comentario = req.body;
  const result = await setContactanos(comentario);
  if (result) {
    res.status(201).send("Comentario agregado con éxito");
  } else {
    res.status(500).send("Error al agregar el comentario");
  }
});

// Endpoint para obtener las tareas de un usuario por ID de usuario
router.get("/tareas", async (req, res) => {
  const correo = req.body.correo;
  const id_usuario = await obtenerIdUsuario(correo);
  const result = await getTareas(id_usuario);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Tareas no encontradas");
  }
});

// Endpoint para agregar una nueva tarea
router.post("/tarea", async (req, res) => {
  const tarea = req.body;
  const id_usuario = await obtenerIdUsuario(tarea.correo);
  tarea.id_usuario = id_usuario;
  const result = await setTarea(tarea);
  if (result) {
    res.status(201).send("Tarea agregada con éxito");
  } else {
    res.status(500).send("Error al agregar la tarea");
  }
});

// Endpoint para manejar rutas no encontradas (404)
router.get("/*", (req, res) => {
  res.render("404");
});

export default router;
