import { apiGet, apiPost, apiPatch } from "../../../shared/api/client.js"

export async function getProducts(filters = {}) {
    const { search = "", status = "all", categoryId = "all" } = typeof filters === "string" ? { search: filters } : filters
    const params = new URLSearchParams()

    if (search.trim()) {
        params.set("search", search.trim())
    }

    if (status !== "all") {
        params.set("status", status)
    }

    if (categoryId !== "all") {
        params.set("categoryId", categoryId)
    }

    const query = params.toString()

    return apiGet(query ? `/products?${query}` : `/products`)
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
