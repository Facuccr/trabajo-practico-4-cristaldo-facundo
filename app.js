import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/config/database.js";
import characterRoutes from "./src/routes/character.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//usamos las rutas definidas en characterRoutes
app.use("/api/characters", characterRoutes);

//manejo de error para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});
// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Algo salió mal en el servidor", error: err.message });
});

//sincronizacion de db y levantamiento del sv
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
