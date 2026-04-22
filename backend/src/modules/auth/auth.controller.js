import { parseOptionalImage, parseOptionalPhone, requireEmail, requirePassword, requirePasswordMatch, requireText } from "../../utils/validators/index.js"
import { getAuthCookieOptions, getClearCookieOptions } from "./auth.utils.js"
import { loginStore, registerStore, getStoreSession } from "./auth.service.js"

export async function login(req, res, next) {
    try {
        const email = requireEmail(req.body.email)
        const password = requirePassword(req.body.password)

        const session = await loginStore({ email, password })

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
    try {
        const name = requireText(req.body.name, "name")
        const email = requireEmail(req.body.email)
        const password = requirePassword(req.body.password)
        const repeatPassword = requirePassword(req.body.repassword, "repassword")
        const phone = parseOptionalPhone(req.body.phone, "phone")
        const image = parseOptionalImage(req.body.image, "image")

        requirePasswordMatch(password, repeatPassword, "password")

        const store = await registerStore({
            name,
            email,
            password,
            phone,
            image
        })

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
        const store = await getStoreSession(req.store.storeId)

        res.status(200).json({ store })
    } catch (error) {
        next(error)
    }
}

export async function logout(req, res, next) {
    try {
        res.clearCookie("token", getClearCookieOptions())

        res.status(200).json({
            message: "Logout successful"
        })
    } catch (error) {
        next(error)
    }
}