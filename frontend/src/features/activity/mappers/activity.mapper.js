function getEnglishDay(date) {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-US", { weekday: "long" })
}

export function growthRateMapper(data) {
    return {
        growthRate: data?.growth_rate ?? 0,
        date: `${data?.start_date?.slice(0, 10).replaceAll("-", "/") ?? ""} - ${data?.end_date?.slice(0, 10).replaceAll("-", "/") ?? ""}`
    }
}

export function dayPerformanceMapper(data) {
    return {
        bestDay: getEnglishDay(data?.best_day_date),
        worstDay: getEnglishDay(data?.worst_day_date)
    }
}

export function catalogPerformanceMapper(data) {
    return {
        categoryId: data?.category_id ?? null,
        categoryImg: data?.category_image ?? "",
        categoryName: data?.category_name ?? "",
        categoryQuantity: data?.category_total_quantity ?? 0,
        productId: data?.product_id ?? null,
        productImg: data?.product_image ?? "",
        productName: data?.product_name ?? "",
        productQuantity: data?.product_total_quantity ?? 0
    }
}