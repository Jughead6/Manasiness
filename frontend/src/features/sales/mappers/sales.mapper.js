export function mapSalesToTables(data) {
    return data.map((item) => ({
        id: item.id,
        date: item.date,
        product: item.product,
        customer: item.customer,
        price: item.price,
        quantity: item.quantity,
        state: item.state
    }))
}

export function mapCustomerOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}