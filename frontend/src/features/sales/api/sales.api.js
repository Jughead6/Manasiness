import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getSales() {
    return apiGet(`/sales`)
}

export async function registerSales(data) {
    return apiPost(`/sales/register`, data)
}


