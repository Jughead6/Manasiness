import { findActiveWorkersOptions, findAllWorkers, findWorkerBaseById, findWorkerRowsById, getWorkerTotalRows } from "./workers.repository.js"

export async function getAllWorkers(data) {
    return findAllWorkers(data)
}

export async function getWorkerDetail(data) {
    const worker = await findWorkerBaseById(data)

    if (!worker) {
        return null
    }

    const rows = await findWorkerRowsById(data)
    const totalRows = await getWorkerTotalRows(data)

    return {
        ...worker,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveWorkersOptions(data) {
    return findActiveWorkersOptions(data)
}