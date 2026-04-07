import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getOrders() {
    return apiGet(`/orders`)
}

export async function registerOrders(data) {
    return apiPost(`/orders/register`, data)
}
