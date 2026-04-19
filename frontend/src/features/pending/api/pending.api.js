import { apiGet } from "../../../shared/api/client";

export async function getCustomersPending() {
    return apiGet(`/pending/customers`)
}

export async function getSuppliersPending() {
    return apiGet(`/pending/suppliers`)
}

export async function getWorkersPending() {
    return apiGet(`/pending/workers`)
}