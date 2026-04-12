import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getSales(sortOrder = "recent", page = 1) {
    return apiGet(`/sales?sort=${sortOrder}&page=${page}`)
}

export async function registerSales(data) {
    return apiPost(`/sales/register`, data)
}

export async function getCustomerOptions() {
    return apiGet("/customers/options")
}