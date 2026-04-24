import { apiGet, apiPost } from "../../../shared/api/client"

export async function login(data) {
    return apiPost("/auth/login", data)
}

export async function sendRegisterCode(data) {
    return apiPost("/auth/register/send-code", data)
}

export async function verifyRegisterCode(data) {
    return apiPost("/auth/register/verify-code", data)
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

export async function sendPasswordResetCode(data) {
    return apiPost("/auth/password/send-code", data)
}

export async function verifyPasswordResetCode(data) {
    return apiPost("/auth/password/verify-code", data)
}

export async function resetPassword(data) {
    return apiPost("/auth/password/reset", data)
}

