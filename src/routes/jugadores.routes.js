const { Router } = require('express');
const {
  createJugador, validateJugador,
  deleteJugador,
  getJugador,
  getJugadores,
  updateJugador,
} = require('../controllers/jugadores.controller.js');

const router = Router();

// GET todas los Jugadores
router.get("/jugadores", getJugadores);

// GET una Jugador
router.get("/jugador/:id", getJugador);

// DELETE An Jugador
router.delete("/jugador/:id", deleteJugador);

// INSERT An Jugador
router.post("/jugador", validateJugador, createJugador);

// UPDATE AN Jugador
router.patch("/jugador/:id", validateJugador, updateJugador);

module.exports = router;
