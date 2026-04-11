export function errorHandler(error, req, res, next) {
    const status = error.status || 500

    if (status >= 500) {
        return res.status(500).json({ error: "Request failed" })
    }

    return res.status(status).json({ error: error.message || "Request failed" })
}