import { formatCurrency } from "../../../shared/utils/currency.js"

function formatDate(date) {
    if (!date) return ""

    return new Date(`${String(date).slice(0, 10)}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}

function getEnglishDay(date) {
    if (!date) return ""

    return new Date(`${String(date).slice(0, 10)}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" })
}

export function growthRateMapper(data) {
    const rate = Number(data?.growth_rate ?? 0)

    return {
        growthRate: rate,
        date: `${formatDate(data?.start_date)} - ${formatDate(data?.end_date)}`,
        summary: rate > 0 ? "Higher than the previous period." : rate < 0 ? "Lower than the previous period." : "Same as the previous period."
    }
}

export function dayPerformanceMapper(data, currencyCode = "PEN") {
    return {
        bestDay: getEnglishDay(data?.best_day_date),
        bestDayDate: formatDate(data?.best_day_date),
        bestDayTotalLabel: formatCurrency(data?.best_day_total, currencyCode),
        worstDay: getEnglishDay(data?.worst_day_date),
        worstDayDate: formatDate(data?.worst_day_date),
        worstDayTotalLabel: formatCurrency(data?.worst_day_total, currencyCode)
    }
}

export function catalogPerformanceMapper(data) {
    return {
        categoryId: data?.category_id ?? null,
        categoryImg: data?.category_image || "https://i.postimg.cc/KYydTs9w/noimage.png",
        categoryName: data?.category_name ?? "",
        categoryQuantity: Number(data?.category_total_quantity ?? 0),
        productId: data?.product_id ?? null,
        productImg: data?.product_image || "https://i.postimg.cc/KYydTs9w/noimage.png",
        productName: data?.product_name ?? "",
        productQuantity: Number(data?.product_total_quantity ?? 0)
    }
}
