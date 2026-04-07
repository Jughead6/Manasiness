import { apiGet } from "../../../shared/api/client.js"

export async function getWorkers() {
    return apiGet(`/workers`)
}

export async function getWorkerById(id) {
    return apiGet(`/workers/${id}`)
}