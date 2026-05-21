import express from "express"
import { signup, login, verifyOtp , forgotPassword, resetPassword} from "../controllers/authController.js"
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router()

router.post("/signup", upload.single("photo"), signup);
router.post("/verify-otp", verifyOtp)
router.post("/login",login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router;