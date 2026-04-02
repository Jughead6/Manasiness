export async function getSales() {
    const response = await fetch("http://localhost:3000/sales")
    const data = await response.json()
    return salesContent(data)
}

function salesContent(data) {
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