export function mapStaffToTables(data) {
    return data.map((item) => ({
        id: item.id,
        date: item.date,
        worker: item.user_id,
        salary: item.salary,
        state: item.state
    }))
}