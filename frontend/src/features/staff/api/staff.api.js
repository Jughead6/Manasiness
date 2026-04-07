import { apiGet, apiPost } from "../../../shared/api/client.js"

export async function getStaff() {
    return apiGet(`/staff`)
}

export async function registerStaff(data) {
    return apiPost(`/staff/register`, data)
}

