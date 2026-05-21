import express from "express"

import protect from "../middleware/authMiddleware.js"
import { genaratePass, getPasses , getSinglePass} from "../controllers/pass.controller.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post("/generate", protect, allowRoles("admin","employee", "security"), genaratePass )
router.get("/" , protect,allowRoles("visitor","admin","employee"), getPasses)
router.get("/:id",protect,allowRoles("visitor", "admin","employee"), getSinglePass)
export default router