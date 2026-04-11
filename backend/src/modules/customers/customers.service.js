import { findActiveCustomersOptions, findAllCustomers, findCustomerBaseById, findCustomerRowsById, getCustomerTotalRows } from "./customers.repository.js"

export async function getAllCustomers(data) {
    return findAllCustomers(data)
}

export async function getCustomerDetail(data) {
    const customer = await findCustomerBaseById(data)

    if (!customer) {
        return null
    }

    const rows = await findCustomerRowsById(data)
    const totalRows = await getCustomerTotalRows(data)

    return {
        ...customer,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveCustomersOptions(data) {
    return findActiveCustomersOptions(data)
}