import { Router } from "express";
import {
  createBitacora,
  deleteBitacora,
  getBitacora,
  getBitacoras,
  getBitacorasCompletadas,
  getBitacorasPendientes,
  getBitacorasTareaCompletadas,
  getBitacorasTareaPendientes,
  getHistorialJugador,
  updateBitacora
} from "../controllers/bitacora.controller.js";

const router = Router();

// GET todas las Bitacoras
router.get("/bitacoras", getBitacoras);

// GET una Bitacora
router.get("/bitacora/:id", getBitacora);

// GET las BitacoraS completadas
router.get("/bitacoras/completadas", getBitacorasCompletadas);

// GET las BitacoraS pendientes
router.get("/bitacoras/pendientes", getBitacorasPendientes);

// GET las Bitacora completadas segun la tarea_id
router.get("/bitacoras/:tarea_id/completadas", getBitacorasTareaCompletadas);

// GET las Bitacora pendientes segun la tarea_id
router.get("/bitacoras/:tarea_id/pendientes", getBitacorasTareaPendientes);

// GET el historial del jugador_id
router.get("/bitacoras/historial/:jugador_id", getHistorialJugador);


// DELETE An Bitacora
router.delete("/bitacora/:id", deleteBitacora);

// INSERT An Bitacora
router.post("/bitacora", createBitacora);

// UPDATE AN Bitacora
router.patch("/bitacora/:id", updateBitacora);

export default router;