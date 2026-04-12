import { findAllSales, getSalesTotalRows, insertSale } from "./sales.repository.js"

export async function getAllSales(data) {
    const [rows, total] = await Promise.all([
        findAllSales(data),
        getSalesTotalRows(data)
    ])

    return {
        rows,
        total_rows: Number(total.total_rows)
    }
}

export async function createNewSale(data) {
    return insertSale(data)
}