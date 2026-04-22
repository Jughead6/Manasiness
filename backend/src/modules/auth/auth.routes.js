import { Router } from "express"
import { login, logout, me, register } from "./auth.controller.js"
import { verifyToken } from "../../middlewares/auth.middleware.js"
import { authRateLimit } from "../../middlewares/auth-rate-limit.js"

const router = Router()

router.post("/login", authRateLimit, login)
router.post("/register", authRateLimit, register)
router.get("/me", verifyToken, me)
router.post("/logout", logout)

export default router