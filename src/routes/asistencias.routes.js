import { Router } from "express";
import {
  createAsistencia,
  deleteAsistencia,
  getAsistencia,
  getAsistencias,
  getAsistenciasDeJugador
} from "../controllers/asistencias.controller.js";

const router = Router();

// GET todas los asistencias
router.get("/asistencias", getAsistencias);

// GET la asistencias de un jugador a una reunion
router.get("/asistencia/:jugador_id/:reunion_id", getAsistencia);

// GET todas las asistencias de un jugador
router.get("/asistencias/:jugador_id", getAsistenciasDeJugador);

// DELETE An Asistencia
router.delete("/asistencia/:jugador_id/:reunion_id", deleteAsistencia);

// INSERT An Asistencia
router.post("/asistencia", createAsistencia);

// UPDATE AN Asistencia
// no se puede actualizar (UPDATE) una asistencia:
// si tiene asist.: existe el registro  jugador_id - reunion_id
// si tiene falta: NO existe un registro jugador_id - reunion_id
// .: esta funcion se ejecutará sólo cuando
// 🟩 asistió y despues le borra la asistencia 🔲
// entonces:   
router.delete("/asistencia/:jugador_id/:reunion_id", deleteAsistencia);
// porque si no hay asistencia 🔲 y lo marca con asistencia 🟩
// entonces: Se crea el registro.


export default router;
