import { Router } from "express";
import {
  createStaff,
  deleteStaff,
  getStaff,
  getStaffs,
  updateStaff,
} from "../controllers/staff.controller.js";

const router = Router();

// GET todas los Staffs
router.get("/staffs", getStaffs);

// GET una Staff
router.get("/staff/:id", getStaff);

// DELETE An Staff
router.delete("/staff/:id", deleteStaff);

// INSERT An Staff
router.post("/staff", createStaff);

// UPDATE AN Staff
router.patch("/staff/:id", updateStaff);

export default router;
