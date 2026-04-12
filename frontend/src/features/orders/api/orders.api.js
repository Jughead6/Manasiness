import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getOrders(sortOrder = "recent", page = 1) {
    return apiGet(`/orders?sort=${sortOrder}&page=${page}`)
}

export async function registerOrders(data) {
    return apiPost(`/orders/register`, data)
}

export async function getSupplierOptions() {
    return apiGet("/suppliers/options")
}