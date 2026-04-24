import { getActiveWorkersOptions, getAllWorkers, getWorkerDetail } from "./workers.service.js"
import { parseHistoryWindowQuery, parseOptionalSearch, parseOptionalStatus, requirePositiveInteger } from "../../utils/validators/index.js"

export async function getWorkers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")
        const status = parseOptionalStatus(req.query.status, "status")

        const workers = await getAllWorkers({ storeId, search, status })

        res.json(workers)
    } catch (error) {
        next(error)
    }
}

export async function getWorkerById(req, res, next) {
    try {
        const id = requirePositiveInteger(req.params.id, "id")
        const { orderDirection, limit, rowOffset, dayOffset, period } = parseHistoryWindowQuery(req.query)
        const storeId = req.store.storeId

        const worker = await getWorkerDetail({ id, orderDirection, limit, rowOffset, dayOffset, period, storeId })

        res.json(worker)
    } catch (error) {
        next(error)
    }
}

export async function getWorkerOptions(req, res, next) {
    try {
        const storeId = req.store.storeId

        const workers = await getActiveWorkersOptions({ storeId })

        res.json(workers)
    } catch (error) {
        next(error)
    }
}
