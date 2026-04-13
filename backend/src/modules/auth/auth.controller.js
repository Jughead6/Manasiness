import { loginStore, registerStore, getStoreSession } from "./auth.service.js"
import { getAuthCookieOptions, getClearCookieOptions } from "./auth.utils.js"

export async function login(req, res, next) {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }

        const session = await loginStore(email, password)

        if (!session) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        res.cookie("token", session.token, getAuthCookieOptions())

        res.status(200).json({
            message: "Login successful",
            store: session.store
        })
    } catch (error) {
        next(error)
    }
}

export async function register(req, res, next) {
    const { name, email, password, repassword, phone, image } = req.body

    try {
        const cleanPhone = phone || null
        const cleanImage = image || "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"

        if (!name || !email || !password || !repassword) {
            return res.status(400).json({ error: "Complete the entire form" })
        }

        if (password !== repassword) {
            return res.status(400).json({ error: "The passwords are different" })
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: "Email invalid" })
        }

        if (phone && !/^9\d{8}$/.test(phone)) {
            return res.status(400).json({ error: "Phone invalid" })
        }

        const store = await registerStore({
            name,
            email,
            password,
            phone: cleanPhone,
            image: cleanImage
        })

        if (!store) {
            return res.status(401).json({ error: "Verify that your credentials are unique" })
        }

        res.status(201).json({
            message: "Register successful",
            store
        })
    } catch (error) {
        next(error)
    }
}

export async function me(req, res, next) {
    try {
        const storeId = req.store.storeId
        const store = await getStoreSession(storeId)

        if (!store) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        res.status(200).json({ store })
    } catch (error) {
        next(error)
    }
}

export async function logout(req, res, next) {
    try {
        res.clearCookie("token", getClearCookieOptions())
        res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        next(error)
    }
}