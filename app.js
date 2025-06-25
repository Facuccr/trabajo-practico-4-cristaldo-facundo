import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log("Base de datos sincronizada");
    });
  })
  .catch((err) => {
    console.error("Error al conectar con la BD", err);
  });
