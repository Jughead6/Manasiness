import { apiGet } from "../../../shared/api/client.js"

export async function getSuppliers(search = "") {
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set("search", search.trim())
    }

    const query = params.toString()

    return apiGet(query ? `/suppliers?${query}` : `/suppliers`)
}

export async function getSupplierById(id, sortOrder = "recent", page = 1) {
    return apiGet(`/suppliers/${id}?sort=${sortOrder}&page=${page}`)
}