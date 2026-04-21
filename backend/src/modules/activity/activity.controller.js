import { getGrowthRateByDate, getDayPerformanceByDate, getCatalogPerformanceByDate } from "./activity.service.js"

export async function getGrowthRate(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = req.query.offset
        const activityDateFilter = req.query.activityDateFilter
        const growthRate = await getGrowthRateByDate({storeId, offset, activityDateFilter})

        res.json(growthRate)  
    } catch (error) {
        next(error)
    }
}

export async function getDayPerformance(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = req.query.offset
        const activityDateFilter = req.query.activityDateFilter
        const dayPerformance = await getDayPerformanceByDate({storeId, offset, activityDateFilter})

        res.json(dayPerformance)
    } catch (error) {
        next(error)
    }
}

export async function getCatalogPerformance(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = req.query.offset
        const activityDateFilter = req.query.activityDateFilter
        const catalogOption = req.query.catalogOption
        const catalogPerformance = await getCatalogPerformanceByDate({storeId, offset, activityDateFilter, catalogOption})

        res.json(catalogPerformance)
    } catch (error) {
        next(error)
    }
}
