import { findAllSales, insertSale } from "./sales.repository.js"

export async function getAllSales(orderDirection) {
    return findAllSales(orderDirection)
}

export async function createNewSale(data) {
    return insertSale(data)
}
