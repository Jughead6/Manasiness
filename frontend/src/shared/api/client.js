const API_URL = "http://localhost:3000"

export async function apiGet(path) {
    const response = await fetch(`${API_URL}${path}`)

    if (!response.ok) {
        throw new Error('Request failed')
    }

    return response.json()
}