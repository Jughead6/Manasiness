import { apiGet } from "../../../shared/api/client.js"

export async function getSuppliers(filters = {}) {
    const { search = "", status = "all" } = typeof filters === "string" ? { search: filters } : filters
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set("search", search.trim())
    }

    if (status !== "all") {
        params.set("status", status)
    }

    const query = params.toString()

    return apiGet(query ? `/suppliers?${query}` : `/suppliers`)
}

export async function getSupplierById(id, { sort = "recent", page = 1, offset = 0, period = "day" } = {}) {
    const params = new URLSearchParams({
        sort,
        page: String(page),
        offset: String(offset),
        period
    })

    return apiGet(`/suppliers/${id}?${params.toString()}`)
}
