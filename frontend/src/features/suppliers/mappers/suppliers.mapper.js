export function mapSuppliersToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image
    }))
}

export function mapSupplierToDetail(data) {
    return {
        name: data.name || '',
        details: (data.rows || []).map((item) => ([
            item.date,
            item.product,
            item.price,
            item.quantity,
            item.state
        ]))
    }
}

export function mapTotalPage(data) {
    return Math.ceil((data.total_rows || 0) / 20)
}