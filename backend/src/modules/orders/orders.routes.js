import { Router } from "express"
import { getOrders, registerOrder } from "./orders.controller.js"

const router = Router()

router.get("/", getOrders)
router.post("/register", registerOrder)

export default router
