import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getStaff(sortOrder = 'recent') {
    return apiGet(`/staff?sort=${sortOrder}`)
}

export async function registerStaff(data) {
    return apiPost(`/staff/register`, data)
}

export async function getWorkerOptions() {
    return apiGet('/workers/options')
}
