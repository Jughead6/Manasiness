import { apiGet } from "../../../shared/api/client.js"

export async function getCustomers(search = "") {
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set("search", search.trim())
    }

    const query = params.toString()

    return apiGet(query ? `/customers?${query}` : `/customers`)
}

export async function getCustomerById(id, sortOrder = "recent", page = 1) {
    return apiGet(`/customers/${id}?sort=${sortOrder}&page=${page}`)
}