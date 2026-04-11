import jwt from 'jsonwebtoken'

export function generateToken(store) {
    return jwt.sign(
        {
            storeId: store.id,
            email: store.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d"}
    )
}