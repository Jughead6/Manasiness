const API_URL = "http://localhost:3000"

function getHeaders() {
    const token = localStorage.getItem("token")

    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
    }
}

export async function apiGet(path) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: getHeaders()
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(result?.error || "Request failed")
    }

    return result
}

export async function apiPost(path, data) {
    const response = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(result?.error || "Request failed")
    }

    return result
}

export async function apiPatch(path, data) {
    const response = await fetch(`${API_URL}${path}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data)
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(result?.error || "Request failed")
    }

    return result
}