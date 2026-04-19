import { apiGet } from "../../../shared/api/client.js";

export async function getGrowthRate() {
    return apiGet(`/activity/growth-rate`)
}

export async function getDayPerformance() {
    return apiGet(`/activity/day-performance`)
}

export async function getCatalogPerformance() {
    return apiGet(`/activity/catalog-performance`)
}