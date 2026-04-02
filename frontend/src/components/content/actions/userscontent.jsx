export async function getUsers() {
    const response = await fetch("http://localhost:3000/users")
    const data = await response.json()
    return usersContent(data)
}

function usersContent(data) {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        details: [
                `Phone: ${item.phone}`,
                `Role: ${item.role}`
        ]
        
    }))
}