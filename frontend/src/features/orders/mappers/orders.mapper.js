export function mapOrdersToTables(data) {
    return data.map((item) => ({
        id: item.id,
        date: item.date,
        product: item.product,
        supplier: item.supplier,
        price: item.price,
        quantity: item.quantity,
        state: item.state
    }))
}