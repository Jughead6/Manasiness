import { apiGet } from '../../../shared/api/client';

export async function getProducts() {
    return apiGet(`/products`)
}

export async function getProductById(id) {
    return apiGet(`/products/${id}`)
}