import jwt from "jsonwebtoken"

export function generateToken(store) {
    return jwt.sign(
        {
            storeId: store.id,
            email: store.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

export function getAuthCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    }
}

export function getClearCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    }
}