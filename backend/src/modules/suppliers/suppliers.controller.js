import { getActiveSuppliersOptions, getAllSuppliers, getSupplierDetail } from "./suppliers.service.js"
import { parseHistoryWindowQuery, parseOptionalSearch, parseOptionalStatus, requirePositiveInteger } from "../../utils/validators/index.js"

export async function getSuppliers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")
        const status = parseOptionalStatus(req.query.status, "status")

        const suppliers = await getAllSuppliers({ storeId, search, status })

        res.json(suppliers)
    } catch (error) {
        next(error)
    }
}

export async function getSupplierById(req, res, next) {
    try {
        const id = requirePositiveInteger(req.params.id, "id")
        const { orderDirection, limit, rowOffset, dayOffset, period } = parseHistoryWindowQuery(req.query)
        const storeId = req.store.storeId

        const supplier = await getSupplierDetail({ id, orderDirection, limit, rowOffset, dayOffset, period, storeId })

        res.json(supplier)
    } catch (error) {
        next(error)
    }
}

export async function getSupplierOptions(req, res, next) {
    try {
        const storeId = req.store.storeId

        const suppliers = await getActiveSuppliersOptions({ storeId })

        res.json(suppliers)
    } catch (error) {
        next(error)
    }
}
