import { getIncomeByWeek, getIncomeByDay } from "./income.service.js"
import { requireNonNegativeNumber, requireISODate } from "../../utils/validators/index.js"

export async function getInfoBar(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = requireNonNegativeNumber(req.query.offset, "offset")

        const income = await getIncomeByWeek({ storeId, offset })

        res.json(income)
    } catch (error) {
        next(error)
    }
}

export async function getInfoCard(req, res, next) {

    try {
        const storeId = req.store.storeId
        const date = requireISODate(req.query.date, "date")
        
        const income = await getIncomeByDay({ storeId, date })

        res.json(income)
    } catch (error) {
        next(error)
    }
}
