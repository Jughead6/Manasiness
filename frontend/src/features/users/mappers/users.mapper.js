export function mapUsersToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Phone: ${item.phone}`,
            `Role: ${item.role}`
        ]
    }))
}

export function mapUserToDetail(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Phone: ${item.phone}`,
            `Role: ${item.role}`
        ]
    }
}