import { findIncomeByWeek, findIncomeByDay } from "./income.repository.js"

export async function getIncomeByWeek(data) {
    return findIncomeByWeek(data)
}

export async function getIncomeByDay(data) {
    return findIncomeByDay(data)
}