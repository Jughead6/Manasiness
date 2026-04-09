import { apiGet } from "../../../shared/api/client.js"

export async function getSuppliers() {
    return apiGet(`/suppliers`)
}

export async function getSupplierById(id, sortOrder = 'recent', page = 1) {
    return apiGet(`/suppliers/${id}?sort=${sortOrder}&page=${page}`)
}