export async function getStaff() {
    const response = await fetch("http://localhost:3000/staff")
    const data = await response.json()
    return staffContent(data)
}

function staffContent(data) {
    return data.map((item) => ({
        id: item.id,
        date: item.date,
        worker: item.user_id,
        salary: item.salary,
        state: item.state
    }))
}