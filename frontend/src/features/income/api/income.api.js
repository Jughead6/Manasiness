import { apiGet } from "../../../shared/api/client.js"

export async function getIncome(data) {
    const { offset, period } = data

    return apiGet(`/income?offset=${offset}&period=${encodeURIComponent(period)}`)
}

export async function getInfoCard(data) {
    const { date, period } = data

    return apiGet(`/income/day?date=${encodeURIComponent(date)}&period=${encodeURIComponent(period)}`)
}
