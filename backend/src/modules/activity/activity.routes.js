import { Router } from "express"
import { getGrowthRate, getDayPerformance, getCatalogPerformance } from "./activity.controller.js"

const router = Router()

router.get("/growth-rate", getGrowthRate)
router.get("/day-performance", getDayPerformance)
router.get("/catalog-performance", getCatalogPerformance)

export default router