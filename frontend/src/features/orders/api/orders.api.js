import { apiGet, apiPost } from '../../../shared/api/client'

export async function getOrders() {
    return apiGet(`/orders`)
}

export async function postOrders(data) {
    return apiPost(`/orders/register`, data)
}
