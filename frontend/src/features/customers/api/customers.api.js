import { apiGet } from "../../../shared/api/client.js"

export async function getCustomers() {
    return apiGet(`/customers`)
}

export async function getCustomerById(id, sortOrder = "recent", page = 1) {
    return apiGet(`/customers/${id}?sort=${sortOrder}&page=${page}`)
}