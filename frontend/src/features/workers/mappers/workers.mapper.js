export function mapWorkersToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image
    }))
}

export function mapWorkerToDetail(data) {
    return {
        name: data.name || '',
        details: (data.rows || []).map((item) => ([
            item.date,
            item.salary,
            item.state
        ]))
    }
}

export function mapTotalPage(data) {
    return Math.ceil((data.total_rows || 0) / 20)
}