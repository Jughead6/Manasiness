import { getStatsSales, getStatsOrders, getStatsStaff } from "./stats.service.js"

export async function getSalesStats(req, res, next) {
    try {
        const storeId = req.store.storeId
        const stats = await getStatsSales({ storeId })

        res.json(stats)
    } catch (error) {
        next(error)
    }
}

export async function getOrdersStats(req, res, next) {
    try {
        const storeId = req.store.storeId
        const stats = await getStatsOrders({ storeId })

        res.json(stats)
    } catch (error) {
        next(error)
    }
}

export async function getStaffStats(req, res, next) {
    try {
        const storeId = req.store.storeId
        const stats = await getStatsStaff({ storeId })

        res.json(stats)
    } catch (error) {
        next(error)
    }
}