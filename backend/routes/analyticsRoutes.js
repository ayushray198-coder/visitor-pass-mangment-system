import express from "express"

import {getDashboardAnalytics} from "../controllers/analytics.controller.js"

import {protect} from "../middleware/authMiddleware.js"

import {allowRoles} from "../middleware/roleMiddleware.js"

const router =express.Router()

router.get("/dashboard", protect,allowRoles("admin","employee"), getDashboardAnalytics)

export default router