import { apiGet } from "../../../shared/api/client.js"

export async function getSuppliers() {
    return apiGet(`/suppliers`)
}

export async function getSupplierById(id) {
    return apiGet(`/suppliers/${id}`)
}