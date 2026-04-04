export function mapSuppliersToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image
    }))
}

export function mapSupplierToDetail(data) {
    return {
        name: data.length > 0 ? data[0].name : '',
        details: data.map((item) => ([
            item.date,
            item.product,
            item.price,
            item.quantity,
            item.state
        ]))
    }
}