export function expensesMapper(data) {
    return data.map((item) => {
        const safeDay = String(item.day).split("T")[0]

        return {
            day: safeDay,
            name: new Date(`${safeDay}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" }),
            total: Number(item.total ?? 0)
        }
    })
}
export function expensesByDayMapper(data) {
    return {
        total: Number(data.total ?? 0),
        totalsub1: Number(data.total_staff ?? 0),
        totalsub2: Number(data.total_orders ?? 0)
    }
}