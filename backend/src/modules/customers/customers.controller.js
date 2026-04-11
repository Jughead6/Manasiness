import { getActiveCustomersOptions, getAllCustomers, getCustomerDetail } from "./customers.service.js"

export async function getCustomers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { search = "" } = req.query
        const customers = await getAllCustomers({ storeId, search })
        res.json(customers)
    } catch (error) {
        next(error)
    }
}

export async function getCustomerById(req, res, next) {
    const { sort = "recent", page = 1 } = req.query
    const { id } = req.params
    const orderDirection = sort === "oldest" ? "ASC" : "DESC"
    const currentPage = Number(page)
    const limit = 20
    const offset = (currentPage - 1) * limit

    try {
        const storeId = req.store.storeId
        const customer = await getCustomerDetail({id, orderDirection, limit, offset, storeId})

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" })
        }

        res.json(customer)
    } catch (error) {
        next(error)
    }
}

export async function getCustomerOptions(req, res, next) {
    try {
        const storeId = req.store.storeId
        const customers = await getActiveCustomersOptions({storeId})
        res.json(customers)
    } catch (error) {
        next(error)
    }
}