import "dotenv/config";
import { createPool } from "mysql2/promise"; //se importa la función createPool de la librería mysql2/promise
// por que promise? -> porque es una promesa, es decir, es una función asíncrona que devuelve un valor en el futuro

export const pool = createPool({
  //se exporta la función pool que se encarga de crear la conexión a la base de datos
  host: process.env.HOST_NAME,
  port: process.env.PORT_DB,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
});
