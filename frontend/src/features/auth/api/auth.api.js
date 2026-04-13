import { apiGet, apiPost } from "../../../shared/api/client"

export async function login(data) {
    return apiPost("/auth/login", data)
}

export async function register(data) {
    return apiPost("/auth/register", data)
}

export async function getSession() {
    return apiGet("/auth/me")
}

export async function logout() {
    return apiPost("/auth/logout", {})
}