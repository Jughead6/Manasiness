import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getSales(sortOrder = 'recent') {
    return apiGet(`/sales?sort=${sortOrder}`)
}

export async function registerSales(data) {
    return apiPost(`/sales/register`, data)
}

export async function getCustomerOptions() {
    return apiGet('/customers/options')
}

