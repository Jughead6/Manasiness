import { Router } from "express"
import { getSales, registerSale } from "./sales.controller.js"

const router = Router()

router.get("/", getSales)
router.post("/register", registerSale)

export default router
