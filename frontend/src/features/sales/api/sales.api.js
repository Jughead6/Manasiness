import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getSales({ sort = "recent", page = 1, offset = 0, period = "day" } = {}) {
    const params = new URLSearchParams({
        sort,
        page: String(page),
        offset: String(offset),
        period
    })

    return apiGet(`/sales?${params.toString()}`)
}

export async function registerSales(data) {
    return apiPost(`/sales/register`, data)
}

export async function getCustomerOptions() {
    return apiGet("/customers/options")
}
