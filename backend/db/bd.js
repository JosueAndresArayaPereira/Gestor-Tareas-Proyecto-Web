import { mysql2 } from "mysql2/promise";

mysql2
  .createConnection({
    host: "localhost",
    user: "",
    password: "password",
    database: "database",
    port: 3306,
  })
  .then((connection) => {
    console.log("Connected to MySQL");
  })
  .catch((error) => {
    console.log("Error connecting to MySQL: " + error);
  });
