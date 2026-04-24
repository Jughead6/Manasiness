function formatPendingTime(date) {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now - past

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (hours < 1) {
        return "Just now"
    }

    if (hours < 24) {
        return `${hours} h ago`
    }

    return `${days} ${days === 1 ? "day" : "days"} ago`
}

function mapPendingGroup(data) {
    return {
        count: Number(data?.count ?? 0),
        total: Number(data?.total ?? 0)
    }
}

export function userPendingMapper(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        dayAgo: formatPendingTime(item.day_ago),
        amount: Number(item.amount ?? 0)
    }))
}

export function pendingSummaryMapper(data) {
    return {
        customers: mapPendingGroup(data?.customers),
        suppliers: mapPendingGroup(data?.suppliers),
        workers: mapPendingGroup(data?.workers),
        global: mapPendingGroup(data?.global)
    }
}
