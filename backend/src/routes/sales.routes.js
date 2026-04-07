import { Router } from 'express'
import { getSales, registerSale } from '../controllers/sales.controller.js'

const router = Router()

router.get("/", getSales)
router.post("/register", registerSale)

export default router