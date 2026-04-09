import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getOrders(sortOrder = 'recent') {
    return apiGet(`/orders?sort=${sortOrder}`)
}

export async function registerOrders(data) {
    return apiPost(`/orders/register`, data)
}

export async function getSupplierOptions() {
    return apiGet('/suppliers/options')
}
