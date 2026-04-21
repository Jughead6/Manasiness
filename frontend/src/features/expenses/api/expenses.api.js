import { apiGet } from "../../../shared/api/client.js";

export async function getInfoBar(offset) {
    return apiGet(`/expenses?offset=${offset}`)
}

export async function getInfoCard(date) {
    return apiGet(`/expenses/day?date=${encodeURIComponent(date)}`)
}