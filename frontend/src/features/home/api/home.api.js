import { apiGet } from "../../../shared/api/client.js"

export async function getSalesStats() {
    return apiGet("/stats/sales")
}

export async function getOrdersStats() {
    return apiGet("/stats/orders")
}

export async function getStaffStats() {
    return apiGet("/stats/staff")
}