import { apiGet } from '../../../shared/api/client'

export async function getSales() {
    return apiGet(`/sales`)
}

