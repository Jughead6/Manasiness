import { findActiveSuppliersOptions, findAllSuppliers, findSupplierBaseById, findSupplierRowsById, getSupplierTotalRows, getSupplierWindowInfo } from "./suppliers.repository.js"
import { notFound } from "../../errors/http-errors.js"

export async function getAllSuppliers(data) {
    return findAllSuppliers(data)
}

export async function getSupplierDetail(data) {
    const { id, storeId } = data

    const supplier = await findSupplierBaseById({ id, storeId })

    if (!supplier) {
        throw notFound("Supplier not found")
    }

    const [rows, totalRows, windowInfo] = await Promise.all([
        findSupplierRowsById({ ...data, id, storeId }),
        getSupplierTotalRows({ id, storeId, dayOffset: data.dayOffset }),
        getSupplierWindowInfo({ id, storeId, dayOffset: data.dayOffset })
    ])

    return {
        ...supplier,
        rows,
        total_rows: Number(totalRows.total_rows),
        start_date: windowInfo.start_date,
        end_date: windowInfo.end_date,
        has_older: windowInfo.has_older,
        has_newer: windowInfo.has_newer
    }
}

export async function getActiveSuppliersOptions(data) {
    return findActiveSuppliersOptions(data)
}
