import { findActiveWorkersOptions, findAllWorkers, findWorkerBaseById, findWorkerRowsById, getWorkerTotalRows } from "./workers.repository.js"
import { notFound } from "../../errors/http-errors.js"
import { requirePositiveInteger } from "../../utils/validators.js"

export async function getAllWorkers(data) {
    return findAllWorkers(data)
}

export async function getWorkerDetail(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "user_id")

    const worker = await findWorkerBaseById({ id, storeId })

    if (!worker) {
        throw notFound("Worker not found")
    }

    const rows = await findWorkerRowsById({ ...data, id, storeId })
    const totalRows = await getWorkerTotalRows({ id, storeId })

    return {
        ...worker,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveWorkersOptions(data) {
    return findActiveWorkersOptions(data)
}
