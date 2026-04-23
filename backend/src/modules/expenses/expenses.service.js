import { findExpensesByPeriod, findExpensesByDay } from "./expenses.repository.js"

export async function getExpensesByPeriod(data) {
    return findExpensesByPeriod(data)
}

export async function getExpensesByDay(data) {
    return findExpensesByDay(data)
}
