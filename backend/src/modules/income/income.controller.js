import { getIncomeByWeek, getIncomeByDay } from "./income.service.js"

export async function getInfoBar(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = req.query.offset
        const income = await getIncomeByWeek({ storeId, offset })

        res.json(income)
    } catch (error) {
        next(error)
    }
}

export async function getInfoCard(req, res, next) {
    const { date } = req.query

    try {
        const storeId = req.store.storeId
        const income = await getIncomeByDay({ storeId, date })

        res.json(income)
    } catch (error) {
        next(error)
    }
}
