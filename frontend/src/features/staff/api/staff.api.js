import { apiGet, apiPost } from '../../../shared/api/client'

export async function getStaff() {
    return apiGet(`/staff`)
}

export async function postStaff(data) {
    return apiPost(`/staff/register`, data)
}

