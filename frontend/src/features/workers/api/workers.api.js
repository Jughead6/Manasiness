import { apiGet } from "../../../shared/api/client.js"

export async function getWorkers(filters = {}) {
    const { search = "", status = "all" } = typeof filters === "string" ? { search: filters } : filters
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set("search", search.trim())
    }

    if (status !== "all") {
        params.set("status", status)
    }

    const query = params.toString()

    return apiGet(query ? `/workers?${query}` : `/workers`)
}

export async function getWorkerById(id, { sort = "recent", page = 1, offset = 0, period = "day" } = {}) {
    const params = new URLSearchParams({
        sort,
        page: String(page),
        offset: String(offset),
        period
    })

    return apiGet(`/workers/${id}?${params.toString()}`)
}
