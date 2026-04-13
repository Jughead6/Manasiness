import { badRequest } from "../../errors/http-errors.js"
import { requireText } from "../../utils/validators.js"

const DEFAULT_STORE_IMAGE = "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"

export function requireEmail(value, fieldName = "email") {
    const email = requireText(value, fieldName).toLowerCase()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw badRequest(`${fieldName} invalid`)
    }

    return email
}

export function requirePassword(value, fieldName = "password") {
    return requireText(value, fieldName)
}

export function requirePasswordMatch(password, repassword) {
    if (password !== repassword) {
        throw badRequest("password invalid")
    }
}

export function parseOptionalPhone(value) {
    if (value === undefined || value === null || value === "") {
        return null
    }

    if (typeof value !== "string") {
        throw badRequest("phone invalid")
    }

    const phone = value.trim()

    if (!/^9\d{8}$/.test(phone)) {
        throw badRequest("phone invalid")
    }

    return phone
}

export function parseOptionalImage(value) {
    if (value === undefined || value === null || value === "") {
        return DEFAULT_STORE_IMAGE
    }

    if (typeof value !== "string") {
        throw badRequest("image invalid")
    }

    const image = value.trim()

    return image || DEFAULT_STORE_IMAGE
}