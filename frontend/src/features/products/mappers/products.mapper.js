export function mapProductsToCards(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details : [
            `Category: ${item.category}`,
            `Descrpition: ${item.description}`,
            `Cost Price: ${item.cost_price}`,
            `Sale Price: ${item.sale_price}`,
            `Stock: ${item.stock_product}`
        ]
    }))
    
}

export function mapProductToDetail(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Category: ${item.category}`,
            `Cost Price: ${item.cost_price}`,
            `Sale Price: ${item.sale_price}`,
            `Description: ${item.description}`,
            `Stock: ${item.stock_product}`
        ]
    }
}