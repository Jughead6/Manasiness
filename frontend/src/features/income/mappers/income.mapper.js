function getWeekDayName(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { weekday: "short" })
}

export function incomeMapper(data) {
    return data.map((item) => {
        const safeDay = String(item.day).split("T")[0]

        return {
            day: safeDay,
            name: getWeekDayName(safeDay),
            label: new Date(`${safeDay}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            total: Number(item.total ?? 0)
        }
    })
}

export function incomeByDayMapper(data) {
    return {
        total: Number(data.net_income ?? 0),
        totalsub1: Number(data.total_sold ?? 0),
        totalsub2: Number(data.total_spent ?? 0)
    }
}
