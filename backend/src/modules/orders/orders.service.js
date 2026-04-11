import { findAllOrders, insertOrder } from "./orders.repository.js"

export async function getAllOrders(data) {
    return findAllOrders(data)
}

export async function createNewOrder(data) {
    return insertOrder(data)
}
