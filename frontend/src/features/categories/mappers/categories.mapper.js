export function mapCategoriesToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Created At: ${item.created_at}`,
            `Active: ${item.is_active ? 'Yes' : 'No'}`
        ]
    }))
}

export function mapCategoryToDetail(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        isActive: item.is_active,
        details: [
            `Created At: ${item.created_at}`,
            `Updated At: ${item.updated_at || 'No updates yet'}`,
            `Active: ${item.is_active ? 'Yes' : 'No'}`
        ]
    }
}

export function mapCategoryToEdit(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
    }
}

export function mapCategoryOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}