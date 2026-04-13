export function errorHandler(error, req, res, next) {
    if (error.code === "23505") {
        return res.status(409).json({ error: "Conflict" })
    }

    if (error.code === "23503") {
        return res.status(400).json({ error: "Invalid relation"})
    }

    if (error.code === "23502") {
        return res.status(400).json({ error: "Missing data"})
    }

    if (error.code === "22P02") {
        return res.status(400).json({ error: "Invalid data"})
    }

    const status = error.status || 500

    if (status >= 500) {
        return res.status(500).json({ error: "Request failed"})
    }

    return res.status(status).json({ error:  error.message || "Request failed"})
}