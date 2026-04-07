export function mapStaffToTables(data) {
    return data.map((item) => ({
        id: item.id,
        date: item.date,
        worker: item.worker,
        salary: item.salary,
        state: item.state
    }))
}