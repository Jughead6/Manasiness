import { apiGet, apiPatch } from "../../../shared/api/client.js"

export async function getPendingSummary() {
    return apiGet(`/pending/summary`)
}

export async function getCustomersPending() {
    return apiGet(`/pending/customers`)
}

export async function getSuppliersPending() {
    return apiGet(`/pending/suppliers`)
}

export async function getWorkersPending() {
    return apiGet(`/pending/workers`)
}

export async function updatePendingState(scope, id, state) {
    return apiPatch(`/pending/${scope}/${id}/state`, { state })
}
