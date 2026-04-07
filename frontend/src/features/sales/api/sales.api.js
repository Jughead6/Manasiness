import { apiGet, apiPost } from '../../../shared/api/client'

export async function getSales() {
    return apiGet(`/sales`)
}

export async function postSales(data) {
    return apiPost(`/sales/register`, data)
}


