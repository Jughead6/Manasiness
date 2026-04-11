import { getAllOrders, createNewOrder } from "./orders.service.js"

export async function getOrders(req, res, next) {
    const { sort = "recent" } = req.query
    const orderDirection = sort === "oldest" ? "ASC" : "DESC"

    try {
        const storeId = req.store.storeId
        const orders = await getAllOrders({orderDirection, storeId})

        res.json(orders)
    } catch (error) {
        next(error)
    }
}

export async function registerOrder(req, res, next) {
    const { product_id, user_id, quantity, state } = req.body

    try {
        const storeId = req.store.storeId
        const order = await createNewOrder({product_id, user_id, quantity, state, storeId})

        if (!order) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.status(201).json({
            message: "Register successfully",
            order
        })
    } catch (error) {
        next(error)
    }
}
