import { getExpensesByWeek, getExpensesByDay } from "./expenses.service.js"

export async function getInfoBar(req, res, next) {
    try {
        const storeId = req.store.storeId
        const offset = req.query.offset
        const expenses = await getExpensesByWeek({ storeId, offset })

        res.json(expenses)
    } catch (error) {
        next(error)
    }
}

export async function getInfoCard(req, res, next) {
    const { date } = req.query

    try {
        const storeId = req.store.storeId
        const expenses = await getExpensesByDay({ storeId, date })

        res.json(expenses)
    } catch (error) {
        next(error)
    }
}
