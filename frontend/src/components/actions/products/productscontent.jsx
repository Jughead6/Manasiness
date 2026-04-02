export async function getProducts() {
    const response = await fetch("http://localhost:3000/products")
    const data = await response.json()
    return productsContent(data)
}

function productsContent(data) {
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