import { apiGet } from "../../../shared/api/client.js";

export async function getIncome() {
    return apiGet(`/income`)
}

export async function getInfoCard(date) {
    return apiGet(`/income/day?date=${encodeURIComponent(date)}`)
}