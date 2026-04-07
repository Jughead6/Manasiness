import { Router } from "express"
import { getOrders, registerOrder } from "../controllers/orders.controller.js"

const router = Router()

router.get("/", getOrders)
router.post("/register", registerOrder)

export default router