import { findSalesStatsSummary, findOrdersStatsSummary, findStaffStatsSummary } from "./stats.repository.js"

export async function getStatsSales(data) {
    return findSalesStatsSummary(data)
}

export async function getStatsOrders(data) {
    return findOrdersStatsSummary(data)
}

export async function getStatsStaff(data) {
    return findStaffStatsSummary(data)
}