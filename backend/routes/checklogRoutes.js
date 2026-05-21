import express from "express"

import { checkInVisitor, checkOutVisitor ,getCheckLogs } from "../controllers/checklog.controller.js"

import { protect } from "../middleware/authMiddleware.js"

import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router();

router.post("/check-in", protect, allowRoles("security", "admin"), checkInVisitor)

router.post("/check-out", protect, allowRoles("security", "admin"), checkOutVisitor)

router.get("/",protect,allowRoles("security","admin"),getCheckLogs)
export default router