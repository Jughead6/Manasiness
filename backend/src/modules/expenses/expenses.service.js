import { findExpensesByWeek, findExpensesByDay } from "./expenses.repository.js"

export async function getExpensesByWeek(data) {
    return findExpensesByWeek(data)
}

export async function getExpensesByDay(data) {
    return findExpensesByDay(data)
}