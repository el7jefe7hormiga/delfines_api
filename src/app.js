const express = require("express");
const morgan = require("morgan");

const indexRoutes = require('./routes/index.routes.js');
const jugadoresRoutes = require("./routes/jugadores.routes.js");
const tareasRoutes = require("./routes/tareas.routes.js");
const bitacoraRoutes = require("./routes/bitacora.routes.js");
const staffRoutes = require('./routes/staff.routes.js');
const asistenciasRoutes = require('./routes/asistencias.routes.js');
const reunionesRoutes = require('./routes/reuniones.routes.js');

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

module.exports = app;
