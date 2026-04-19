function formatPendingTime(date) {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now - past

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if ( hours < 1 ) {
        return "Just now"
    }

    if ( hours < 24) {
        return `${hours} h ago`
    }

    return `${days} ${days === 1 ? "day" : "days"} ago`
}

export function userPendingMapper(data) {

    return data.map((item) => ({
        id: item.id,
        name: item.name,
        day_ago: formatPendingTime(item.day_ago),
        amount: item.amount
    }))
}