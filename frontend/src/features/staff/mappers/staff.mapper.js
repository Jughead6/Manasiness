export function mapStaffToTables(data) {
    return (data.rows || []).map((item) => ({
        id: item.id,
        date: item.date,
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