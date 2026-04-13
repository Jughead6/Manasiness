import { getAllOrders, createNewOrder } from "./orders.service.js"
import { requirePositiveInteger } from "../../utils/validators.js"

export async function getOrders(req, res, next) {
    const { sort = "recent", page = 1 } = req.query
    const orderDirection = sort === "oldest" ? "ASC" : "DESC"
    const currentPage = requirePositiveInteger(page, "page")
    const limit = 20
    const offset = (currentPage - 1) * limit

    try {
        const storeId = req.store.storeId
        const orders = await getAllOrders({ orderDirection, limit, offset, storeId })

        res.json(orders)
    } catch (error) {
        next(error)
    }
}

export async function registerOrder(req, res, next) {
    const { product_id, user_id, quantity, state } = req.body

    try {
        const storeId = req.store.storeId
        const order = await createNewOrder({ product_id, user_id, quantity, state, storeId })

        res.status(201).json({
            message: "Register successfully",
            order
        })
    } catch (error) {
        next(error)
    }
}