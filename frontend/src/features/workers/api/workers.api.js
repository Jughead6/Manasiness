import { apiGet } from "../../../shared/api/client.js"

export async function getWorkers(search = "") {
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set("search", search.trim())
    }

    const query = params.toString()

    return apiGet(query ? `/workers?${query}` : `/workers`)
}

export async function getWorkerById(id, sortOrder = "recent", page = 1) {
    return apiGet(`/workers/${id}?sort=${sortOrder}&page=${page}`)
}