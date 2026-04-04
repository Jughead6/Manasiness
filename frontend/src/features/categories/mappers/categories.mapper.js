export function mapCategoriesToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details: []
    }))
}

export function mapCategoryToDetail(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Created At: ${item.date}`
        ]
    }
}