import {
    findActiveWorkersOptions,
    findAllWorkers,
    findWorkerBaseById,
    findWorkerRowsById,
    getWorkerTotalRows
} from "./workers.repository.js"

export async function getAllWorkers() {
    return findAllWorkers()
}

export async function getWorkerDetail(id, orderDirection, limit, offset) {
    const worker = await findWorkerBaseById(id)

    if (!worker) {
        return null
    }

    const rows = await findWorkerRowsById(id, orderDirection, limit, offset)
    const totalRows = await getWorkerTotalRows(id)

    return {
        ...worker,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveWorkersOptions() {
    return findActiveWorkersOptions()
}