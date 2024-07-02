import "dotenv/config"; // se importa la libreria dotenv que se encarga de leer las variables de entorno
import { createPool } from "mysql2/promise"; //estamos ocupando la libreria de mysql2 y la version orientada a promesas
// que es create pool ---> es una función que se encarga de crear la conexión a la base de datos
// por que promise? -> porque es una promesa, es decir, es una función asíncrona que devuelve un valor en el futuro

//se exporta la función pool que se encarga de crear la conexión a la base de datos
export const pool = createPool({
  //se exporta la función pool que se encarga de crear la conexión a la base de datos
  host: process.env.HOST_NAME,
  port: process.env.PORT_DB,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
});
