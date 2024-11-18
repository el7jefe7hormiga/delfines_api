import { Router } from "express";
import {
  createJugador,
  deleteJugador,
  getJugador,
  getJugadores,
  updateJugador,
} from "../controllers/jugadores.controller.js";

const router = Router();

// GET todas los Jugadores
router.get("/jugadores", getJugadores);

// GET una Jugador
router.get("/jugador/:id", getJugador);

// DELETE An Jugador
router.delete("/jugador/:id", deleteJugador);

// INSERT An Jugador
router.post("/jugador", createJugador);

// UPDATE AN Jugador
router.patch("/jugador/:id", updateJugador);

export default router;