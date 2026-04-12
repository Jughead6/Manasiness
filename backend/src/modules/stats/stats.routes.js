import { Router } from "express"
import { getSalesStats, getOrdersStats, getStaffStats } from "./stats.controller.js"

const router = Router()

router.get("/sales", getSalesStats)
router.get("/orders", getOrdersStats)
router.get("/staff", getStaffStats)

export default router