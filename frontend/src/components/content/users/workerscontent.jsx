export async function getWorkers() {
    const response = await fetch('http://localhost:3000/workers')
    const data = await response.json()
    return workersContent(data)
}

function workersContent(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image
    }))
}
