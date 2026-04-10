import { Router } from "express"
import { register } from "./register.controller.js"

const router = Router()

router.post("/", register)

export default router