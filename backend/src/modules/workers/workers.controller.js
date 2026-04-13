import { getActiveWorkersOptions, getAllWorkers, getWorkerDetail } from "./workers.service.js"
import { requirePositiveInteger } from "../../utils/validators.js"

export async function getWorkers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { search = "" } = req.query
        const workers = await getAllWorkers({storeId, search})

        res.json(workers)
    } catch (error) {
        next(error)
    }
}

export async function getWorkerById(req, res, next) {
    const { sort = "recent", page = 1 } = req.query
    const orderDirection = sort === 'oldest' ? 'ASC' : 'DESC'
    const { id } = req.params
    const currentPage = requirePositiveInteger(page, "page")
    const limit = 20
    const offset = (currentPage - 1) * limit

    try {
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