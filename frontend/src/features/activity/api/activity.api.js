import { apiGet } from "../../../shared/api/client.js"

export async function getGrowthRate(data) {
    const { offset, activityDateFilter } = data

    return apiGet(`/activity/growth-rate?offset=${offset}&activityDateFilter=${activityDateFilter}`)
}

export async function getDayPerformance(data) {
    const { offset, activityDateFilter } = data

    return apiGet(`/activity/day-performance?offset=${offset}&activityDateFilter=${activityDateFilter}`)
}

export async function getCatalogPerformance(data) {
    const { offset, activityDateFilter, catalogOption } = data

    return apiGet(`/activity/catalog-performance?offset=${offset}&activityDateFilter=${activityDateFilter}&catalogOption=${catalogOption}`)
}