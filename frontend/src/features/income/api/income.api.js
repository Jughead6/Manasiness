import { apiGet } from "../../../shared/api/client.js";

export async function getIncome(offset) {
    return apiGet(`/income?offset=${offset}`)
}

export async function getInfoCard(date) {
    return apiGet(`/income/day?date=${encodeURIComponent(date)}`)
}