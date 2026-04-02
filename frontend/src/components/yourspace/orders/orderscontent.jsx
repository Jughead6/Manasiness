export async function getOrders() {
    const response = await fetch("http://localhost:3000/orders")
    const data = await response.json()
    return ordersContent(data)
}

function ordersContent(data) {
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