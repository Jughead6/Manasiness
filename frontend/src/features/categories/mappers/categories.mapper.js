export function mapCategoriesToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        status: item.is_active ? "Active" : "Inactive",
        details: [
            `Created At: ${item.created_at}`,
            `Updated At: ${item.updated_at || 'No updates yet'}`
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
            { label: "Created At", value: item.created_at },
            { label: "Updated At", value: item.updated_at || "No updates yet" },
            { label: "Active", value: item.is_active ? "Yes" : "No" }
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
