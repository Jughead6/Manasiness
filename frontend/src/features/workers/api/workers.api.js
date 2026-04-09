import { apiGet } from "../../../shared/api/client.js"

export async function getWorkers() {
    return apiGet(`/workers`)
}

export async function getWorkerById(id, sortOrder = 'recent', page = 1) {
    return apiGet(`/workers/${id}?sort=${sortOrder}&page=${page}`)
}