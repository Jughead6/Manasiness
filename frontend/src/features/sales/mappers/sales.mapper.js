export function mapSalesToTables(data) {
    return data.map((item) => ({
        id: item.id,
        date: item.date,
        product: item.product,
        worker: item.worker,
        price: item.price,
        quantity: item.quantity,
        state: item.state
    }))
}

