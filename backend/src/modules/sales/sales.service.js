import { findAllSales, getSalesTotalRows, insertSale } from "./sales.repository.js"
import { findProductById } from "../products/products.repository.js"
import { findUserById } from "../users/users.repository.js"
import { badRequest, conflict, notFound } from "../../errors/http-errors.js"

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
    const { storeId, productId, userId, quantity, state } = data

    const product = await findProductById({ id: productId, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    if (!product.is_active) {
        throw conflict("Product unavailable")
    }

    if (state === "paid" && Number(product.stock) < quantity) {
        throw conflict("Insufficient stock")
    }

    const user = await findUserById({ id: userId, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    if (!user.is_active) {
        throw conflict("User unavailable")
    }

    if (user.role !== "customer") {
        throw badRequest("Invalid customer")
    }

    return insertSale({
        product_id: productId,
        user_id: userId,
        quantity,
        state,
        storeId
    })
}
