export function mapOrdersToTables(data) {
    return (data.rows || []).map((item) => ({
        id: item.id,
        date: item.date,
        product: item.product,
        supplier: item.supplier,
        price: item.price,
        quantity: item.quantity,
        state: item.state
    }))
}

export function mapOrdersTotalPage(data) {
    return Math.ceil((data.total_rows || 0) / 20)
}

export function mapSupplierOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}