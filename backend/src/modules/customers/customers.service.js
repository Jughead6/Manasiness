import {
    findActiveCustomersOptions,
    findAllCustomers,
    findCustomerBaseById,
    findCustomerRowsById,
    getCustomerTotalRows
} from "./customers.repository.js"

export async function getAllCustomers() {
    return findAllCustomers()
}

export async function getCustomerDetail(id, orderDirection, limit, offset) {
    const customer = await findCustomerBaseById(id)

    if (!customer) {
        return null
    }

    const rows = await findCustomerRowsById(id, orderDirection, limit, offset)
    const totalRows = await getCustomerTotalRows(id)

    return {
        ...customer,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveCustomersOptions() {
    return findActiveCustomersOptions()
}