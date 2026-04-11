import { apiPost } from "../../../shared/api/client";

export async function login(data) {
    return apiPost(`/auth/login`, data)
}

export async function register(data) {
    return apiPost("/auth/register", data)
}