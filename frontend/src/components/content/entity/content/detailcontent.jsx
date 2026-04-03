export async function getDetails(route, id) {
    const response = await fetch(`http://localhost:3000/${route}/${id}`)
    const data = await response.json()
    return data
}

export function categoriesInfo(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
            `Create At: ${item.date}`
        ]
    }
}

export function productsInfo(item) {
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

export function usersInfo(item) {
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