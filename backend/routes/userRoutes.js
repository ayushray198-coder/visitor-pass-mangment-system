import express from "express"

import { getUsers, updateUserRole, createStaff } from "../controllers/user.controller.js"

import { protect } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.get("/", protect, allowRoles("admin"), getUsers)
router.post("/create-staff", protect, allowRoles("admin"), createStaff)

router.patch("/:userId/role", protect, allowRoles("admin"), updateUserRole)

export default router
