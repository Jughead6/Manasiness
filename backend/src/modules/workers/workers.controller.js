import { getActiveWorkersOptions, getAllWorkers, getWorkerDetail } from "./workers.service.js"

export async function getWorkers(req, res, next) {
    try {
        const workers = await getAllWorkers()

        res.json(workers)
    } catch (error) {
        next(error)
    }
}

export async function getWorkerById(req, res, next) {
    const { sort = "recent", page = 1 } = req.query
    const orderDirection = sort === 'oldest' ? 'ASC' : 'DESC'
    const { id } = req.params
    const currentPage = Number(page)
    const limit = 20
    const offset = (currentPage - 1) * limit

    try {
        const worker = await getWorkerDetail(id, orderDirection, limit, offset)

        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' })
        }

        res.json(worker)
    } catch (error) {
        next(error)
    }
}

export async function getWorkerOptions(req, res, next) {
    try {
        const workers = await getActiveWorkersOptions()

        res.json(workers)
    } catch (error) {
        next(error)
    }
}