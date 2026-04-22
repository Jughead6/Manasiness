import { findActiveSuppliersOptions, findAllSuppliers, findSupplierBaseById, findSupplierRowsById, getSupplierTotalRows } from "./suppliers.repository.js"
import { notFound } from "../../errors/http-errors.js"
import { requirePositiveInteger } from "../../utils/validators/index.js"

export async function getAllSuppliers(data) {
    return findAllSuppliers(data)
}

export async function getSupplierDetail(data) {
    const { id, storeId } = data

    const supplier = await findSupplierBaseById({ id, storeId })

    if (!supplier) {
        throw notFound("Supplier not found")
    }

    const rows = await findSupplierRowsById({ ...data, id, storeId })
    const totalRows = await getSupplierTotalRows({ id, storeId })

    return {
        ...supplier,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveSuppliersOptions(data) {
    return findActiveSuppliersOptions(data)
}
