export async function getCategories() {
    const response = await fetch("http://localhost:3000/categories")
    const data = await response.json()
    return categoriesContent(data)
}

function categoriesContent(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details: []
    }))
}
