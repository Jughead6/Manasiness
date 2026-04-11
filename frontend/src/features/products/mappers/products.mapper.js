export function mapProductsToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Category: ${item.category}`,
            `Cost Price: ${item.cost_price}`,
            `Sale Price: ${item.sale_price}`,
            `Stock: ${item.stock}`,
            `Active: ${item.is_active ? 'Yes' : 'No'}`
        ]
    }))
}

export function mapProductToDetail(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        isActive: item.is_active,
        details: [
            `Category: ${item.category}`,
            `Cost Price: ${item.cost_price}`,
            `Sale Price: ${item.sale_price}`,
            `Stock: ${item.stock}`,
            `Created At: ${item.created_at}`,
            `Updated At: ${item.updated_at || 'No updates yet'}`,
            `Active: ${item.is_active ? 'Yes' : 'No'}`
        ]
    }
}

export function mapProductToEdit(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        category_id: String(item.category_id ?? ''),
        cost_price: item.cost_price,
        sale_price: item.sale_price,
        stock: item.stock,
    }
}

export function mapProductOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}
