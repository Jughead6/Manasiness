import { apiGet } from '../../../shared/api/client'

export async function getOrders() {
    return apiGet(`/orders`)
}

