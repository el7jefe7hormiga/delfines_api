const { Router } = require("express");
const {
  createBitacora,
  deleteBitacora,
  getBitacora,
  getBitacoras,
  getBitacorasCompletadas,
  getBitacorasPendientes,
  getBitacorasTarea,
  getBitacorasTareaCompletadas,
  getBitacorasTareaPendientes,
  getHistorialJugador,
  getInformeBitacora,
  getJugadorTareaBitacora,
  updateBitacora
} = require('../controllers/bitacora.controller.js');

const router = Router();

// GET todas las Bitacoras
router.get("/bitacoras", getBitacoras);

// GET una Bitacora
router.get("/bitacora/:id", getBitacora);

// GET las BitacoraS completadas
router.get("/bitacoras/completadas", getBitacorasCompletadas);

// GET las BitacoraS pendientes
router.get("/bitacoras/pendientes", getBitacorasPendientes);

// GET bitacoras segun la tarea
router.get('/bitacoras/delatarea/:tarea', getBitacorasTarea);

// GET las Bitacora completadas segun la tarea_id
router.get("/bitacoras/completadas/:tarea_id", getBitacorasTareaCompletadas);

// GET las Bitacora pendientes segun la tarea_id
router.get("/bitacoras/pendientes/:tarea_id", getBitacorasTareaPendientes);

// GET el historial del jugador_id
router.get("/bitacoras/historial/:jugador_id", getHistorialJugador);

// GET el informe de la bitacora
router.get("/bitacoras/informe", getInformeBitacora);

// GET donde me traeras jugador-tarea-bitacora
router.get("/jugador/tarea/bitacora/:jugador_id", getJugadorTareaBitacora);


// DELETE An Bitacora
router.delete("/bitacora/:id", deleteBitacora);

// INSERT An Bitacora
router.post("/bitacora", createBitacora);

// UPDATE AN Bitacora
router.patch("/bitacora/:id", updateBitacora);

module.exports = router;
