import { findActiveWorkersOptions, findAllWorkers, findWorkerBaseById, findWorkerRowsById, getWorkerTotalRows, getWorkerWindowInfo } from "./workers.repository.js"
import { notFound } from "../../errors/http-errors.js"

export async function getAllWorkers(data) {
    return findAllWorkers(data)
}

export async function getWorkerDetail(data) {
    const { id, storeId } = data

    const worker = await findWorkerBaseById({ id, storeId })

    if (!worker) {
        throw notFound("Worker not found")
    }

    const [rows, totalRows, windowInfo] = await Promise.all([
        findWorkerRowsById({ ...data, id, storeId }),
        getWorkerTotalRows({ id, storeId, dayOffset: data.dayOffset }),
        getWorkerWindowInfo({ id, storeId, dayOffset: data.dayOffset })
    ])

    return {
        ...worker,
        rows,
        total_rows: Number(totalRows.total_rows),
        start_date: windowInfo.start_date,
        end_date: windowInfo.end_date,
        has_older: windowInfo.has_older,
        has_newer: windowInfo.has_newer
    }
}

export async function getActiveWorkersOptions(data) {
    return findActiveWorkersOptions(data)
}
