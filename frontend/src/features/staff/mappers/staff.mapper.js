export function mapStaffToTables(data) {
    return data.map((item) => ({
        id: item.id,
        date: item.date,
        worker: item.worker,
        salary: item.salary,
        state: item.state
    }))
}

export function mapWorkerOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}