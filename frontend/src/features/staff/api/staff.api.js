import { apiGet } from '../../../shared/api/client'

export async function getStaff() {
    return apiGet(`/staff`)
}

