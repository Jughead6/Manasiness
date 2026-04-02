export async function getCustomers() {
    const response = await fetch('http://localhost:3000/customers')
    const data = await response.json()
    return customersContent(data)
}

function customersContent(data) {
    return data.map((item) => ({
        name: item.name,
        image: item.image
    }))
}