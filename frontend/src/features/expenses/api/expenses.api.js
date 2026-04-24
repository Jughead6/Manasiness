import { apiGet } from "../../../shared/api/client.js"

export async function getInfoBar(data) {
    const { offset, period } = data

    return apiGet(`/expenses?offset=${offset}&period=${encodeURIComponent(period)}`)
}

export async function getInfoCard(data) {
    const { date, period } = data

    return apiGet(`/expenses/day?date=${encodeURIComponent(date)}&period=${encodeURIComponent(period)}`)
}
