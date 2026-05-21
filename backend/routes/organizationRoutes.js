import express from "express"

import { createOrganization , getOrganizations } from "../controllers/organization.controller.js"


import protect from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/create", protect, createOrganization)
router.get("/", protect,getOrganizations)

export default router