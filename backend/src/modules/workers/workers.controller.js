import { getActiveWorkersOptions, getAllWorkers, getWorkerDetail } from "./workers.service.js"
import { parseOptionalSearch, parsePageSortQuery } from "../../utils/validators/index.js"

export async function getWorkers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")

        const workers = await getAllWorkers({storeId, search})

        res.json(workers)
    } catch (error) {
        next(error)
    }
}

export async function getWorkerById(req, res, next) {
    const { id } = req.params

    try {
        const { orderDirection, limit, offset } = parsePageSortQuery(req.query)
        const storeId = req.store.storeId

        const worker = await getWorkerDetail({id, orderDirection, limit, offset, storeId})

        res.json(worker)
    } catch (error) {
        next(error)
    }
}

export async function getWorkerOptions(req, res, next) {
    try {
        const storeId = req.store.storeId
        
        const workers = await getActiveWorkersOptions({storeId})

        res.json(workers)
    } catch (error) {
        next(error)
    }
}