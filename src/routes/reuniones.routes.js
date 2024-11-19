const { Router } = require('express');
const {
  createReunion,
  deleteReunion,
  getReunion,
  getReuniones,
  updateReunion,
} = require('../controllers/reuniones.controller.js');

const router = Router();

// GET todas los reuniones
router.get("/reuniones", getReuniones);

// GET una Reunion
router.get("/reunion/:id", getReunion);

// DELETE An Reunion
router.delete("/reunion/:id", deleteReunion);

// INSERT An Reunion
router.post("/reunion", createReunion);

// UPDATE AN Reunion
router.patch("/reunion/:id", updateReunion);

module.exports = router;
