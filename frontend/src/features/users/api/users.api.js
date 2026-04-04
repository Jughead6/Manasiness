import { apiGet } from '../../../shared/api/client';

export async function getUsers() {
    return apiGet(`/users`)
}

export async function getUserById(id) {
    return apiGet(`/users/${id}`)
}