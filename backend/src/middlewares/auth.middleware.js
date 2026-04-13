import jwt from "jsonwebtoken"
import { unauthorized } from "../errors/http-errors.js"

export function verifyToken(req, res, next) {
    const token = req.cookies?.token

    if (!token) {
        return next(unauthorized("Unauthorized"))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        req.store = { storeId: decoded.storeId }

        next()
    } catch {
        next(unauthorized("Unauthorized"))
    }
}