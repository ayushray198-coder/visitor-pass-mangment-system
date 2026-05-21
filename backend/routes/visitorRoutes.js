import express from "express";
import protect from "../middleware/authMiddleware.js"

import { createVisitor,getVisitor } from "../controllers/visitor.controller.js";


const router = express.Router()

router.post("/",protect, createVisitor)
router.get("/",protect,getVisitor)

export default router