import { apiGet, apiPost, apiPatch } from "../../../shared/api/client.js"

export async function getCategories(search = "") {
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set("search", search.trim())
    }

    const query = params.toString()

    return apiGet(query ? `/categories?${query}` : `/categories`)
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

export async function activateCategory(id) {
    return apiPatch(`/categories/${id}/activate`, {})
}

export async function getCategoryOptions() {
    return apiGet('/categories/options')
}