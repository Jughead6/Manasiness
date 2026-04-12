import { findAllOrders, getOrdersTotalRows, insertOrder } from "./orders.repository.js"

export async function getAllOrders(data) {
    const [rows, total] = await Promise.all([
        findAllOrders(data),
        getOrdersTotalRows(data)
    ])

    return {
        rows,
        total_rows: Number(total.total_rows)
    }
}

export async function createNewOrder(data) {
    return insertOrder(data)
}