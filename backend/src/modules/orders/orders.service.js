import { findAllOrders, getOrdersTotalRows, insertOrder } from "./orders.repository.js"
import { findProductById } from "../products/products.repository.js"
import { findUserById } from "../users/users.repository.js"
import { badRequest, conflict, notFound } from "../../errors/http-errors.js"
import { requireAllowedValue, requirePositiveInteger } from "../../utils/validators.js"

const ORDER_STATES = ["pending", "paid", "canceled"]

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
    const storeId = data.storeId
    const productId = requirePositiveInteger(data.product_id, "product_id")
    const userId = requirePositiveInteger(data.user_id, "user_id")
    const quantity = requirePositiveInteger(data.quantity, "quantity")
    const state = requireAllowedValue(data.state, ORDER_STATES, "state")

    const product = await findProductById({ id: productId, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    if (!product.is_active) {
        throw conflict("Product unavailable")
    }

    const user = await findUserById({ id: userId, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    if (!user.is_active) {
        throw conflict("User unavailable")
    }

    if (user.role !== "supplier") {
        throw badRequest("Invalid supplier")
    }

    return insertOrder({
        product_id: productId,
        user_id: userId,
        quantity,
        state,
        storeId
    })
}