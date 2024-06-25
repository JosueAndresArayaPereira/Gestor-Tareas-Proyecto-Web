import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRouter from "./backend/routes/index.js";

const app = express(); //dando las propiedades de express a app

app.use(express.json()); //diciendo que se usara json como formato de datos

const __dirname = dirname(fileURLToPath(import.meta.url)); //dando la ruta del directorio actual

app.use(express.static(join(__dirname, "frontend/public"))); //diciendo que la carpeta de archivos estaticos es public

app.set("views", join(__dirname, "frontend/views")); //diciendo que la carpeta de vistas es views

app.set("view engine", "ejs"); //diciendo que el motor de vistas es ejs

app.use(indexRouter); //usando el router

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
