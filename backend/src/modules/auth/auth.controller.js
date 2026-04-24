import { parseOptionalImage, parseOptionalPhone, requireEmail, requireLoginPassword, requirePassword, requirePasswordMatch, requireText, requireVerificationCode } from "../../utils/validators/index.js"
import { getAuthCookieOptions, getClearCookieOptions } from "./auth.utils.js"
import { getStoreSession, loginStore, registerStore, resetStorePassword, sendPasswordResetCode, sendRegisterCode, verifyPasswordResetCode, verifyRegisterCode } from "./auth.service.js"

export async function login(req, res, next) {
    try {
        const email = requireEmail(req.body.email)
        const password = requireLoginPassword(req.body.password)

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

export async function sendCode(req, res, next) {
    try {
        const email = requireEmail(req.body.email)

        await sendRegisterCode({ email })

        res.status(200).json({
            message: "Code sent"
        })
    } catch (error) {
        next(error)
    }
}

export async function verifyCode(req, res, next) {
    try {
        const email = requireEmail(req.body.email)
        const code = requireVerificationCode(req.body.code, "code")

        await verifyRegisterCode({ email, code })

        res.status(200).json({
            message: "Code verified"
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
        const code = requireVerificationCode(req.body.code, "code")

        requirePasswordMatch(password, repeatPassword, "password")

        const store = await registerStore({
            name,
            email,
            password,
            phone,
            image,
            code
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

export async function sendResetCode(req, res, next) {
    try {
        const email = requireEmail(req.body.email)

        await sendPasswordResetCode({ email })

        res.status(200).json({
            message: "Code sent"
        })
    } catch (error) {
        next(error)
    }
}

export async function verifyResetCode(req, res, next) {
    try {
        const email = requireEmail(req.body.email)
        const code = requireVerificationCode(req.body.code, "code")

        await verifyPasswordResetCode({ email, code })

        res.status(200).json({
            message: "Code verified"
        })
    } catch (error) {
        next(error)
    }
}

export async function resetPassword(req, res, next) {
    try {
        const email = requireEmail(req.body.email)
        const code = requireVerificationCode(req.body.code, "code")
        const password = requirePassword(req.body.password)
        const repeatPassword = requirePassword(req.body.repassword, "repassword")

        requirePasswordMatch(password, repeatPassword, "password")

        await resetStorePassword({ email, code, password })

        res.status(200).json({
            message: "Password reset successful"
        })
    } catch (error) {
        next(error)
    }
}

