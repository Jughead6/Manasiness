import { findAllOrders, insertOrder } from "./orders.repository.js"

export async function getAllOrders(orderDirection) {
    return findAllOrders(orderDirection)
}

export async function createNewOrder(data) {
    return insertOrder(data)
}
