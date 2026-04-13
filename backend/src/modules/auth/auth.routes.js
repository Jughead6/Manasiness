import { Router } from "express"
import { login, register, me, logout } from "./auth.controller.js"
import { verifyToken } from "../../middlewares/auth.middleware.js"

const router = Router()

router.post("/login", login)
router.post("/register", register)
router.get("/me", verifyToken, me)
router.post("/logout", logout)

export default router