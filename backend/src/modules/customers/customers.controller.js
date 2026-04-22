import { getActiveCustomersOptions, getAllCustomers, getCustomerDetail } from "./customers.service.js"
import { parseOptionalSearch, parsePageSortQuery, requirePositiveInteger } from "../../utils/validators/index.js"

export async function getCustomers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")
        const customers = await getAllCustomers({ storeId, search })

        res.json(customers)
    } catch (error) {
        next(error)
    }
}

export async function getCustomerById(req, res, next) {
    try {
        const id = requirePositiveInteger(req.params.id, "id")
        const { orderDirection, limit, offset } = parsePageSortQuery(req.query)
        const storeId = req.store.storeId

        const customer = await getCustomerDetail({ id, orderDirection, limit, offset, storeId })

        res.json(customer)
    } catch (error) {
        next(error)
    }
}

export async function getCustomerOptions(req, res, next) {
    try {
        const storeId = req.store.storeId

        const customers = await getActiveCustomersOptions({ storeId })

        res.json(customers)
    } catch (error) {
        next(error)
    }
}
