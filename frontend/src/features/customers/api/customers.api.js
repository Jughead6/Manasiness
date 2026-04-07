import { apiGet } from "../../../shared/api/client.js"

export async function getCustomers() {
    return apiGet(`/customers`)
}

export async function getCustomerById(id) {
    return apiGet(`/customers/${id}`)
}