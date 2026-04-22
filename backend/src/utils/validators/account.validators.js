import { badRequest } from "../../errors/http-errors.js"
import { requireText } from "./base.validators.js"

const DEFAULT_IMAGE = "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"

export function requireEmail(value, fieldName = "email") {
    const parsed = requireText(value, fieldName).toLowerCase()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed)) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requirePhone(value, fieldName = "phone") {
    const parsed = requireText(value, fieldName)

    if (!/^9\d{8}$/.test(parsed)) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function parseOptionalPhone(value, fieldName = "phone") {
    if (value === undefined || value === null || value === "") {
        return null
    }

    return requirePhone(value, fieldName)
}

export function parseOptionalImage(value, fieldName = "image") {
    if (value === undefined || value === null || value === "") {
        return DEFAULT_IMAGE
    }

    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    const parsed = value.trim()

    return parsed || DEFAULT_IMAGE
}

export function requirePassword(value, fieldName = "password") {
    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    if (!value.trim()) {
        throw badRequest(`${fieldName} invalid`)
    }

    if (value.length < 8) {
        throw badRequest(`${fieldName} invalid`)
    }

    if (Buffer.byteLength(value, "utf8") > 72) {
        throw badRequest(`${fieldName} invalid`)
    }

    return value
}
export function requirePasswordMatch(password, repeatPassword, fieldName = "password") {
    if (password !== repeatPassword) {
        throw badRequest(`${fieldName} invalid`)
    }
}
