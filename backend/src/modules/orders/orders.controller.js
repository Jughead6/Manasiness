import { getAllOrders, createNewOrder } from "./orders.service.js"
import { parseHistoryWindowQuery, requirePositiveInteger, requireAllowedValue } from "../../utils/validators/index.js"

const ORDER_STATES = ["pending", "paid", "canceled"]

export async function getOrders(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { orderDirection, limit, rowOffset, dayOffset, period } = parseHistoryWindowQuery(req.query)

        const orders = await getAllOrders({ storeId, orderDirection, limit, rowOffset, dayOffset, period })

        res.json(orders)
    } catch (error) {
        next(error)
    }
}

export async function registerOrder(req, res, next) {
    try {
        const storeId = req.store.storeId
        const productId = requirePositiveInteger(req.body.product_id, "product_id")
        const userId = requirePositiveInteger(req.body.user_id, "user_id")
        const quantity = requirePositiveInteger(req.body.quantity, "quantity")
        const state = requireAllowedValue(req.body.state, ORDER_STATES, "state")

        const order = await createNewOrder({ productId, userId, quantity, state, storeId })

        res.status(201).json({
            message: "Register successfully",
            order
        })
    } catch (error) {
        next(error)
    }
}
