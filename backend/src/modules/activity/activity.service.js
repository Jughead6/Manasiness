import { findGrowthRate, findDayPerformance, findCatalogPerformance } from "./activity.repository.js"

export async function getGrowthRateByDate(data) {
    return findGrowthRate(data)
}

export async function getDayPerformanceByDate(data) {
    return findDayPerformance(data)
}

export async function getCatalogPerformanceByDate(data) {
    return findCatalogPerformance(data)
}