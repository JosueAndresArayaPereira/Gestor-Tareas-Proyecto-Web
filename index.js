import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import indexRouter from "./backend/routes/index.js";
import "dotenv/config";

let PORT = process.env.PORT || 3000;

const app = express(); //dando las propiedades de express a app

app.use(bodyParser.json()); //diciendo que se va a usar json
app.use(bodyParser.urlencoded({ extended: true })); //diciendo que se va a usar urlencoded
//que es urlencoded? es un formato de codificación de datos en el que los datos se envían en una cadena de consulta en la URL

const __dirname = dirname(fileURLToPath(import.meta.url)); //dando la ruta del directorio actual

app.use(express.static(join(__dirname, "frontend/public"))); //diciendo que la carpeta de archivos estaticos es public

app.set("views", join(__dirname, "frontend/views")); //diciendo que la carpeta de vistas es views

app.set("view engine", "ejs"); //diciendo que el motor de vistas es ejs

app.use(indexRouter); //usando el router

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
