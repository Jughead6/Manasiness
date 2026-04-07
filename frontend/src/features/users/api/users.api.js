import { apiGet, apiPost, apiPatch } from "../../../shared/api/client.js"

export async function getUsers() {
    return apiGet(`/users`)
}

export async function getUserById(id) {
    return apiGet(`/users/${id}`)
}

export async function editUser(id, data) {
    return apiPost(`/users/${id}/edit`, data)
}

export async function createUser(data) {
    return apiPost(`/users/create`, data)
}

export async function deactivateUser(id) {
    return apiPatch(`/users/${id}/deactivate`, {})
}

