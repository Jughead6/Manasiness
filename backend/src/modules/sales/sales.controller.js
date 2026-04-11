import { getAllSales, createNewSale } from "./sales.service.js"

export async function getSales(req, res, next) {
    const { sort = "recent" } = req.query
    const orderDirection = sort === "oldest" ? "ASC" : "DESC"

    try {
        const storeId = req.store.storeId
        const sales = await getAllSales({orderDirection, storeId})

        res.json(sales)
    } catch (error) {
        next(error)
    }
}

export async function registerSale(req, res, next) {
    const { product_id, user_id, quantity, state } = req.body

    try {
        const storeId = req.store.storeId
        const sale = await createNewSale({product_id, user_id, quantity, state, storeId})

        if (!sale) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.status(201).json({
            message: "Register successfully",
            sale
        })
    } catch (error) {
        next(error)
    }
}
