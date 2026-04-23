function parseDateValue(date) {
    if (!date) return null

    const normalizedDate = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? `${date}T00:00:00`
        : date
    const parsedDate = new Date(normalizedDate)

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

function formatDateTime(date) {
    const newDate = parseDateValue(date)

    if (!newDate) return ""

    const day = String(newDate.getDate()).padStart(2, "0")
    const month = String(newDate.getMonth() + 1).padStart(2, "0")
    const year = newDate.getFullYear()
    const hours = String(newDate.getHours()).padStart(2, "0")
    const minutes = String(newDate.getMinutes()).padStart(2, "0")

    return `${day}/${month}/${year} - ${hours}:${minutes}`
}

function formatDayLabel(date) {
    const newDate = parseDateValue(date)

    if (!newDate) return ""

    const day = String(newDate.getDate()).padStart(2, "0")
    const month = String(newDate.getMonth() + 1).padStart(2, "0")
    const year = newDate.getFullYear()

    return `${day}/${month}/${year}`
}

export function mapStaffToTables(data) {
    return (data.rows || []).map((item) => ({
        id: item.id,
        date: formatDateTime(item.date),
        worker: item.worker,
        salary: item.salary,
        state: item.state
    }))
}

export function mapStaffTotalPage(data) {
    return Math.ceil((data.total_rows || 0) / 20)
}

export function mapStaffWindowLabel(data) {
    if (!data.start_date) return ""

    return formatDayLabel(data.start_date)
}

export function mapStaffWindowState(data) {
    return {
        label: mapStaffWindowLabel(data),
        hasOlder: Boolean(data.has_older),
        hasNewer: Boolean(data.has_newer)
    }
}

export function mapWorkerOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}
