import { apiGet } from '../../../shared/api/client';

export async function getCustomers() {
    return apiGet(`/customers`)
}

export async function getCustomerById(id) {
    return apiGet(`/customers/${id}`)
}