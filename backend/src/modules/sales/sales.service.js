import { findAllSales, insertSale } from "./sales.repository.js"

export async function getAllSales(data) {
    return findAllSales(data)
}

export async function createNewSale(data) {
    return insertSale(data)
}
