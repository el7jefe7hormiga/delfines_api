import { Router } from "express";
import {
  createTarea,
  deleteTarea,
  getTarea,
  getTareas,
  updateTarea,
} from "../controllers/tareas.controller.js";

const router = Router();

// GET todas los tareas
router.get("/tareas", getTareas);

// GET una Tarea
router.get("/tarea/:id", getTarea);

// DELETE An Tarea
router.delete("/tarea/:id", deleteTarea);

// INSERT An Tarea
router.post("/tarea", createTarea);

// UPDATE AN Tarea
router.patch("/tarea/:id", updateTarea);

export default router;
