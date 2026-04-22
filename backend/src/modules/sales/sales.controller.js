import { getAllSales, createNewSale } from "./sales.service.js"
import { parsePageSortQuery, requirePositiveInteger, requireAllowedValue } from "../../utils/validators/index.js"

const SALE_STATES = ["pending", "paid", "canceled"]

export async function getSales(req, res, next) {
    try {
        const { orderDirection, limit, offset } = parsePageSortQuery(req.query)
        const storeId = req.store.storeId

        const sales = await getAllSales({ orderDirection, limit, offset, storeId })

        res.json(sales)
    } catch (error) {
        next(error)
    }
}

export async function registerSale(req, res, next) {
    try {
        const storeId = req.store.storeId
        const productId = requirePositiveInteger(req.body.product_id, "product_id")
        const userId = requirePositiveInteger(req.body.user_id, "user_id")
        const quantity = requirePositiveInteger(req.body.quantity, "quantity")
        const state = requireAllowedValue(req.body.state, SALE_STATES, "state")

        const sale = await createNewSale({ productId, userId, quantity, state, storeId })

        res.status(201).json({
            message: "Register successfully",
            sale
        })
    } catch (error) {
        next(error)
    }
}
