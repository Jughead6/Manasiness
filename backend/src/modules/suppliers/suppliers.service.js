import { findActiveSuppliersOptions, findAllSuppliers, findSupplierBaseById, findSupplierRowsById, getSupplierTotalRows } from "./suppliers.repository.js"

export async function getAllSuppliers(data) {
    return findAllSuppliers(data)
}

export async function getSupplierDetail(data) {
    const supplier = await findSupplierBaseById(data)

    if (!supplier) {
        return null
    }

    const rows = await findSupplierRowsById(data)
    const totalRows = await getSupplierTotalRows(data)

    return {
        ...supplier,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveSuppliersOptions(data) {
    return findActiveSuppliersOptions(data)
}
