export async function getSuppliers() {
    const response = await fetch('http://localhost:3000/suppliers')
    const data = await response.json()
    return suppliersContent(data)
}

function suppliersContent(data) {
    return data.map((item) => ({
        name: item.name,
        image: item.image
    }))
}
