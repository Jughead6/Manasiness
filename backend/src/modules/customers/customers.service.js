import { findActiveCustomersOptions, findAllCustomers, findCustomerBaseById, findCustomerRowsById, getCustomerTotalRows, getCustomerWindowInfo } from "./customers.repository.js"
import { notFound } from "../../errors/http-errors.js"

export async function getAllCustomers(data) {
    return findAllCustomers(data)
}

export async function getCustomerDetail(data) {
    const { id, storeId } = data

    const customer = await findCustomerBaseById({ id, storeId })

    if (!customer) {
        throw notFound("Customer not found")
    }

    const [rows, totalRows, windowInfo] = await Promise.all([
        findCustomerRowsById({ ...data, id, storeId }),
        getCustomerTotalRows({ id, storeId, dayOffset: data.dayOffset }),
        getCustomerWindowInfo({ id, storeId, dayOffset: data.dayOffset })
    ])

    return {
        ...customer,
        rows,
        total_rows: Number(totalRows.total_rows),
        start_date: windowInfo.start_date,
        end_date: windowInfo.end_date,
        has_older: windowInfo.has_older,
        has_newer: windowInfo.has_newer
    }
}

export async function getActiveCustomersOptions(data) {
    return findActiveCustomersOptions(data)
}
