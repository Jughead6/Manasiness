import {
    findActiveSuppliersOptions,
    findAllSuppliers,
    findSupplierBaseById,
    findSupplierRowsById,
    getSupplierTotalRows
} from "./suppliers.repository.js"

export async function getAllSuppliers() {
    return findAllSuppliers()
}

export async function getSupplierDetail(id, orderDirection, limit, offset) {
    const supplier = await findSupplierBaseById(id)

    if (!supplier) {
        return null
    }

    const rows = await findSupplierRowsById(id, orderDirection, limit, offset)
    const totalRows = await getSupplierTotalRows(id)

    return {
        ...supplier,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveSuppliersOptions() {
    return findActiveSuppliersOptions()
}