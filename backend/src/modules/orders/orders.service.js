import { findAllOrders, getOrdersTotalRows, getOrdersWindowInfo, insertOrder } from "./orders.repository.js"
import { findProductById } from "../products/products.repository.js"
import { findUserById } from "../users/users.repository.js"
import { badRequest, conflict, notFound } from "../../errors/http-errors.js"

export async function getAllOrders(data) {
    const [rows, total, windowInfo] = await Promise.all([
        findAllOrders(data),
        getOrdersTotalRows(data),
        getOrdersWindowInfo(data)
    ])

    return {
        rows,
        total_rows: Number(total.total_rows),
        start_date: windowInfo.start_date,
        end_date: windowInfo.end_date,
        has_older: windowInfo.has_older,
        has_newer: windowInfo.has_newer
    }
}

export async function createNewOrder(data) {
    const { storeId, productId, userId, quantity, state } = data

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

    if (user.is_default && state === "pending") {
        throw badRequest("Invalid state")
    }

    return insertOrder({
        product_id: productId,
        user_id: userId,
        quantity,
        state,
        storeId
    })
}
