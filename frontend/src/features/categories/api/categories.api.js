import { apiGet, apiPost, apiPatch } from "../../../shared/api/client.js"

export async function getCategories() {
    return apiGet(`/categories`)
}

export async function getCategoryById(id) {
    return apiGet(`/categories/${id}`)
}

export async function createCategory(data) {
    return apiPost(`/categories/create`, data)
}

export async function editCategory(id, data) {
    return apiPost(`/categories/${id}/edit`, data)
}

export async function deactivateCategory(id) {
    return apiPatch(`/categories/${id}/deactivate`, {})
}