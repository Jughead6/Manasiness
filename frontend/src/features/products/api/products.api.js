import { apiGet, apiPost, apiPatch } from "../../../shared/api/client.js"

export async function getProducts() {
    return apiGet(`/products`)
}

export async function getProductById(id) {
    return apiGet(`/products/${id}`)
}

export async function editProduct(id, data) {
    return apiPost(`/products/${id}/edit`, data)
}

export async function createProduct(data) {
    return apiPost(`/products/create`, data)
}

export async function deactivateProduct(id) {
    return apiPatch(`/products/${id}/deactivate`, {})
}

export async function activateProduct(id) {
    return apiPatch(`/products/${id}/activate`, {})
}

export async function getProductOptions() {
    return apiGet('/products/options')
}
