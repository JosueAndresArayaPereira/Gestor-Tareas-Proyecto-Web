import { pool } from "./bd.js"; // se importa la función pool que se encarga de crear la conexión a la base de datos
import bcrypt from "bcrypt"; // se importa la libreria bcrypt que se encarga de encriptar la contraseña
import "dotenv/config"; // se importa la libreria dotenv que se encarga de leer las variables de entorno

const saltRounds = parseInt(process.env.SALT_ROUNDS); // Número de rondas para el proceso de hash

// Función para insertar un nuevo usuario en la tabla usuario
export const setUsuario = async (usuario) => {
  try {
    // aplicar encriptacion de la contraseña mediante proceso de hash
    const hashedPassword = await bcrypt.hash(usuario.contra, saltRounds);

    const query =
      "INSERT INTO usuario (nombre, correo, contra, tipo_usuario) VALUES (?,?,?,?)";
    // se entregan los datos por separado para evitar una inyeccion de sql

    //result esta entre [] para que se pueda desestructurar el resultado
    const [result] = await pool.query(query, [
      usuario.nombre,
      usuario.correo,
      hashedPassword,
      "normal",
    ]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Función para obtener todos los usuarios de la tabla usuario
export const getUsuarios = async () => {
  try {
    const query = "SELECT * FROM usuario";
    const [result] = await pool.query(query);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Función para obtener un usuario por correo electrónico y verificar la contraseña
export const obtenerUsuarioYVerificarContra = async (correo, plainPassword) => {
  try {
    const query = "SELECT nombre, correo, contra FROM usuario WHERE correo = ?";
    const [rows] = await pool.query(query, [correo]);

    if (rows.length > 0) {
      const usuario = rows[0];
      const hashedPassword = usuario.contra;
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      if (isMatch) {
        return {
          nombre: usuario.nombre,
          correo: usuario.correo,
          id_usuario: usuario.id_usuario,
        };
      } else {
        return false; // Contraseña incorrecta
      }
    } else {
      return false; // Usuario no encontrado
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

//funcion para obtener la id de un usuario por correo
export const obtenerIdUsuario = async (correo) => {
  try {
    const query = "SELECT id_usuario FROM usuario WHERE correo = ?";
    const [rows] = await pool.query(query, [correo]);
    if (rows.length > 0) {
      const usuario = rows[0];
      return usuario.id_usuario;
    } else {
      return false; // Usuario no encontrado
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Función para insertar un comentario en la tabla contactanos
export const setContactanos = async (comentario) => {
  try {
    const query =
      "INSERT INTO contactanos (id_usuario, asunto, descripcion, tipo, fecha_creacion, atendido) VALUES (?,?,?,?,?,?)";
    const [result] = await pool.query(query, [
      comentario.id_usuario,
      comentario.asunto,
      comentario.descripcion,
      comentario.tipo,
      comentario.fecha_creacion,
      "false",
    ]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Función para obtener todas las tareas de un usuario
export const getTareas = async (id_usuario) => {
  try {
    const query =
      "SELECT * FROM tareas WHERE id_usuario = ? ORDER BY id_tarea DESC";
    const [result] = await pool.query(query, [id_usuario]);
    result.map((tarea) => {
      //->map() es una función que se utiliza para transformar los elementos de un array
      tarea.id_usuario = undefined; // Eliminar el id_usuario de la respuesta
    });

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTarea = async (id_tarea) => {
  try {
    const query = "SELECT * FROM tareas WHERE id_tarea = ?";
    const [result] = await pool.query(query, [id_tarea]);
    return result[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

//funcion para modificar una tarea
export const modificarTarea = async (tarea) => {
  try {
    const query =
      "UPDATE tareas SET nombre_tarea = ?, descripcion = ?, fecha_ESTIMADA = ?, estado = ? WHERE id_tarea = ?";

    const [result] = await pool.query(query, [
      tarea.nombre_tarea,
      tarea.descripcion,
      tarea.fecha_ESTIMADA,
      tarea.estado,
      tarea.id_tarea,
    ]);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Función para eliminar una tarea de la tabla tareas
export const deleteTarea = async (id_tarea) => {
  try {
    const query = "DELETE FROM tareas WHERE id_tarea = ?";
    const [result] = await pool.query(query, [id_tarea]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Función para insertar una nueva tarea en la tabla tareas
export const setTarea = async (tarea) => {
  console.table(tarea); // lo muestra como una tabla el objeto tarea
  try {
    const query =
      "INSERT INTO tareas (nombre_tarea, fecha_ESTIMADA, descripcion, estado, id_usuario) VALUES (?,?,?,?,?)";
    const [result] = await pool.query(query, [
      tarea.nombre_tarea,
      tarea.fecha_ESTIMADA,
      tarea.descripcion,
      tarea.estado,
      tarea.id_usuario,
    ]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
