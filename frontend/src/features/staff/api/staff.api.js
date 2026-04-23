import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getStaff({ sort = "recent", page = 1, offset = 0, period = "day" } = {}) {
    const params = new URLSearchParams({
        sort,
        page: String(page),
        offset: String(offset),
        period
    })

    return apiGet(`/staff?${params.toString()}`)
}

export async function registerStaff(data) {
    return apiPost(`/staff/register`, data)
}

export async function getWorkerOptions() {
    return apiGet("/workers/options")
}
