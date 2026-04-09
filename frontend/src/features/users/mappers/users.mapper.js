export function mapUsersToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Phone: ${item.phone}`,
            `Role: ${item.role}`,
            `Active: ${item.is_active ? 'Yes' : 'No'}`
        ]
    }))
}

export function mapUserToDetail(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        isActive: item.is_active,
        details: [
            `Phone: ${item.phone}`,
            `Role: ${item.role}`,
            `Created At: ${item.created_at}`,
            `Updated At: ${item.updated_at || 'No updates yet'}`,
            `Active: ${item.is_active ? 'Yes' : 'No'}`
        ]
    }
}

export function mapUserToEdit(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        phone: item.phone,
        role: item.role
    }
}