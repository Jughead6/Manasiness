import { getExpensesByWeek, getExpensesByDay } from "./expenses.service.js"
import { requireNonNegativeNumber, requireISODate } from "../../utils/validators/index.js"

export async function getInfoBar(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = requireNonNegativeNumber(req.query.offset, "offset")

        const expenses = await getExpensesByWeek({ storeId, offset })

        res.json(expenses)
    } catch (error) {
        next(error)
    }
}

export async function getInfoCard(req, res, next) {
    try {
        const storeId = req.store.storeId
        const date = requireISODate(req.query.date, "date")
        
        const expenses = await getExpensesByDay({ storeId, date })

        res.json(expenses)
    } catch (error) {
        next(error)
    }
}
