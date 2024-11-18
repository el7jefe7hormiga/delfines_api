import express from "express";
import morgan from "morgan";

import indexRoutes from './routes/index.routes.js';
import jugadoresRoutes from "./routes/jugadores.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
import bitacoraRoutes from "./routes/bitacora.routes.js";
import staffRoutes from './routes/staff.routes.js';
import asistenciasRoutes from './routes/asistencias.routes.js';
import reunionesRoutes from './routes/reuniones.routes.js';

process.env.TZ = "America/Mazatlan"
console.log(new Date().toString());

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Rutas de la API
app.use("/", [indexRoutes])
app.use("/api", [jugadoresRoutes, tareasRoutes, staffRoutes, bitacoraRoutes, asistenciasRoutes, reunionesRoutes]);
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada!, (/api/)" });
});

export default app;
