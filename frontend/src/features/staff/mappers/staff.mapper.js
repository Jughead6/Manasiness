function formatDateTime(date) {
    if (!date) return ""

    const newDate = new Date(date)
    const day = String(newDate.getDate()).padStart(2, "0")
    const month = String(newDate.getMonth() + 1).padStart(2, "0")
    const year = newDate.getFullYear()
    const hours = String(newDate.getHours()).padStart(2, "0")
    const minutes = String(newDate.getMinutes()).padStart(2, "0")

    return `${day}/${month}/${year} - ${hours}:${minutes}`
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

export function mapWorkerOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}