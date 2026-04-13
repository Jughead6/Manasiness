import { findActiveCustomersOptions, findAllCustomers, findCustomerBaseById, findCustomerRowsById, getCustomerTotalRows } from "./customers.repository.js"
import { notFound } from "../../errors/http-errors.js"
import { requirePositiveInteger } from "../../utils/validators.js"

export async function getAllCustomers(data) {
    return findAllCustomers(data)
}

export async function getCustomerDetail(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "user_id")

    const customer = await findCustomerBaseById({ id, storeId })

    if (!customer) {
        throw notFound("Customer not found")
    }

    const rows = await findCustomerRowsById({ ...data, id, storeId })
    const totalRows = await getCustomerTotalRows({ id, storeId })

    return {
        ...customer,
        rows,
        total_rows: Number(totalRows.total_rows)
    }
}

export async function getActiveCustomersOptions(data) {
    return findActiveCustomersOptions(data)
}
