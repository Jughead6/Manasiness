import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        req.store = { storeId: decoded.storeId }
        next()
    } catch {
        return res.status(401).json({ error: "Unauthorized" })
    }
}