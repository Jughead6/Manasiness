const API_URL = "http://localhost:3000"

export async function apiGet(path) {
    const response = await fetch(`${API_URL}${path}`)

    if (!response.ok) {
        throw new Error('Request failed')
    }

    return response.json()
}

export async function apiPost(path, data) {
    const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(result?.error || 'Request failed')
    }

    return result
}

export async function apiPatch(path, data) {
    const response = await fetch(`${API_URL}${path}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })

    const result = await response.json().catch(() => null)

    if(!response.ok) {
        throw new Error(result?.error || 'Request failed')
    }

    return result
}