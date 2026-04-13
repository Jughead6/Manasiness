import { findAllSales, getSalesTotalRows, insertSale } from "./sales.repository.js"
import { findProductById } from "../products/products.repository.js"
import { findUserById } from "../users/users.repository.js"
import { badRequest, notFound, conflict } from "../../errors/http-errors.js"
import { requirePositiveInteger, requireAllowedValue } from "../../utils/validators.js"

const SALE_STATS = ["pending", "paid", "canceled"]

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
    const storeId = data.storeId
    const productId = requirePositiveInteger(data.product_id, "product_id")
    const userId = requirePositiveInteger(data.user_id, "user_id")
    const quantity = requirePositiveInteger(data.quantity, "quantity")
    const state = requireAllowedValue(data.state, SALE_STATS, "state")

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