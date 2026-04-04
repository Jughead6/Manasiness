export function mapWorkersToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image
    }))
}

export function mapWorkerToDetail(data) {
    return {
        name: data.length > 0 ? data[0].name : '',
        details: data.map((item) => ([
            item.date,
            item.salary,
            item.state
        ]))
    }
}