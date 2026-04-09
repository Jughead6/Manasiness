import { Router } from "express"
import { getStaff, registerStaff } from "./staff.controller.js"

const router = Router()

router.get("/", getStaff)
router.post("/register", registerStaff)

export default router
