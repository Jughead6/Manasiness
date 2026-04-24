import { formatCurrency } from "../../../shared/utils/currency.js"
import { formatPhone } from "../../../shared/utils/phone.js"

function parseDateValue(date) {
    if (!date) return null

    const normalizedDate = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? `${date}T00:00:00`
        : date
    const parsedDate = new Date(normalizedDate)

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

function formatDateTime(value) {
    const parsedDate = parseDateValue(value)

    if (!parsedDate) {
        return "-"
    }

    const day = String(parsedDate.getDate()).padStart(2, "0")
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const year = parsedDate.getFullYear()

    return `${day}/${month}/${year}`
}

function formatDayLabel(value) {
    const parsedDate = parseDateValue(value)

    if (!parsedDate) {
        return ""
    }

    const day = String(parsedDate.getDate()).padStart(2, "0")
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const year = parsedDate.getFullYear()

    return `${day}/${month}/${year}`
}

export function mapSuppliersToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        status: item.is_active ? "Active" : "Inactive",
        details: [
            `Phone: ${formatPhone(item.phone)}`,
            `Role: Supplier`
        ]
    }))
}

export function mapSupplierToDetail(data, currencyCode = "PEN") {
    const startDate = formatDayLabel(data.start_date)
    const endDate = formatDayLabel(data.end_date)

    return {
        name: data.name || "",
        details: (data.rows || []).map((item) => ([
            formatDateTime(item.date),
            item.product,
            formatCurrency(item.price, currencyCode),
            item.quantity,
            item.state
        ])),
        windowLabel: startDate === endDate ? startDate : `${startDate} - ${endDate}`,
        hasOlder: Boolean(data.has_older),
        hasNewer: Boolean(data.has_newer)
    }
}

export function mapSuppliersTotalPage(data) {
    return Math.ceil((data.total_rows || 0) / 20)
}
