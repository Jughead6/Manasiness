import { getActiveCustomersOptions, getAllCustomers, getCustomerDetail } from "./customers.service.js"
import { parseHistoryWindowQuery, parseOptionalSearch, parseOptionalStatus, requirePositiveInteger } from "../../utils/validators/index.js"

export async function getCustomers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")
        const status = parseOptionalStatus(req.query.status, "status")
        const customers = await getAllCustomers({ storeId, search, status })

        res.json(customers)
    } catch (error) {
        next(error)
    }
}

export async function getCustomerById(req, res, next) {
    try {
        const id = requirePositiveInteger(req.params.id, "id")
        const { orderDirection, limit, rowOffset, dayOffset, period } = parseHistoryWindowQuery(req.query)
        const storeId = req.store.storeId

        const customer = await getCustomerDetail({ id, orderDirection, limit, rowOffset, dayOffset, period, storeId })

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
