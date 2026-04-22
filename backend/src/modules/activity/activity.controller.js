import { getGrowthRateByDate, getDayPerformanceByDate, getCatalogPerformanceByDate } from "./activity.service.js"
import { requireNonNegativeOffset, requirePeriodFilter, requireCatalogOption } from "../../utils/validators/index.js"

export async function getGrowthRate(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = requireNonNegativeOffset(req.query.offset, "offset")
        const activityDateFilter = requirePeriodFilter(req.query.activityDateFilter, "period")
        
        const growthRate = await getGrowthRateByDate({storeId, offset, activityDateFilter})

        res.json(growthRate)  
    } catch (error) {
        next(error)
    }
}

export async function getDayPerformance(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = requireNonNegativeOffset(req.query.offset, "offset")
        const activityDateFilter = requirePeriodFilter(req.query.activityDateFilter, "period")

        const dayPerformance = await getDayPerformanceByDate({storeId, offset, activityDateFilter})

        res.json(dayPerformance)
    } catch (error) {
        next(error)
    }
}

export async function getCatalogPerformance(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = requireNonNegativeOffset(req.query.offset, "offset")
        const activityDateFilter = requirePeriodFilter(req.query.activityDateFilter, "period")
        const catalogOption = requireCatalogOption(req.query.catalogOption, "catalogOption")

        const catalogPerformance = await getCatalogPerformanceByDate({storeId, offset, activityDateFilter, catalogOption})

        res.json(catalogPerformance)
    } catch (error) {
        next(error)
    }
}
