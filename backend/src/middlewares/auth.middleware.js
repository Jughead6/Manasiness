import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({error: "Invalid token"})
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).son({error: "Invalid token"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.store = decoded
        next()
    } catch(error) {
        return res.status(401).json({error: "Invalid token or expired"})
    }
}