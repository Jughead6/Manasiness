import { getGrowthRateByDate, getDayPerformanceByDate, getCatalogPerformanceByDate } from "./activity.service.js"

export async function getGrowthRate(req, res, next) {
    try {
        const storeId = req.store.storeId
        const growthRate = await getGrowthRateByDate({storeId})

        res.json(growthRate)  
    } catch (error) {
        next(error)
    }
}

export async function getDayPerformance(req, res, next) {
    try {
        const storeId = req.store.storeId
        const dayPerformance = await getDayPerformanceByDate({storeId})

        res.json(dayPerformance)
    } catch (error) {
        next(error)
    }
}

export async function getCatalogPerformance(req, res, next) {
    try {
        const storeId = req.store.storeId
        const catalogPerformance = await getCatalogPerformanceByDate({storeId})

        res.json(catalogPerformance)
    } catch (error) {
        next(error)
    }
}
