import express from "express";
import protect  from "../middleware/authMiddleware.js";
import { createAppointment, getAppointment , updateAppointmentStatus} from "../controllers/appointment.controller.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
const router = express.Router()

router.post("/",protect,createAppointment);
router.get("/",protect,getAppointment)
router.patch("/:appointmentId/status",protect,allowRoles("admin", "employee"), updateAppointmentStatus)
export default router