import { findIncomeByPeriod, findIncomeByDay } from "./income.repository.js"

export async function getIncomeByPeriod(data) {
    return findIncomeByPeriod(data)
}

export async function getIncomeByDay(data) {
    return findIncomeByDay(data)
}
