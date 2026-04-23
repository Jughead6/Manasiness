import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getOrders({ sort = "recent", page = 1, offset = 0, period = "day" } = {}) {
    const params = new URLSearchParams({
        sort,
        page: String(page),
        offset: String(offset),
        period
    })

    return apiGet(`/orders?${params.toString()}`)
}

export async function registerOrders(data) {
    return apiPost(`/orders/register`, data)
}

export async function getSupplierOptions() {
    return apiGet("/suppliers/options")
}
