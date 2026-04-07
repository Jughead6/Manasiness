import { apiGet, apiPost } from '../../../shared/api/client';

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

