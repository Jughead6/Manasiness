import { apiGet } from "../../../shared/api/client.js";

export async function getInfoBar() {
    return apiGet(`/expenses`)
}

export async function getInfoCard(date) {
    return apiGet(`/expenses/day?date=${encodeURIComponent(date)}`)
}