import { apiGet } from '../../../shared/api/client';

export async function getCategories() {
    return apiGet(`/categories`)
}

export async function getCategoryById(id) {
    return apiGet(`/categories/${id}`)
}