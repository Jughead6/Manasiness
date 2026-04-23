import { getExpensesByPeriod, getExpensesByDay } from "./expenses.service.js"
import { requireNonNegativeNumber, requireISODate, requirePeriodFilter } from "../../utils/validators/index.js"

export async function getInfoBar(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = requireNonNegativeNumber(req.query.offset, "offset")
        const period = requirePeriodFilter(req.query.period ?? "week", "period")

        const expenses = await getExpensesByPeriod({ storeId, offset, period })

        res.json(expenses)
    } catch (error) {
        next(error)
    }
}

export async function getInfoCard(req, res, next) {
    try {
        const storeId = req.store.storeId
        const date = requireISODate(req.query.date, "date")
        const period = requirePeriodFilter(req.query.period ?? "week", "period")
        
        const expenses = await getExpensesByDay({ storeId, date, period })

        res.json(expenses)
    } catch (error) {
        next(error)
    }
}
