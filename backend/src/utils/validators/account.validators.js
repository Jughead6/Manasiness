import { badRequest } from "../../errors/http-errors.js"
import { requireText } from "./base.validators.js"

const DEFAULT_IMAGE = "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"

export const CURRENCY_SYMBOLS = {
    PEN: "S/",
    USD: "$",
    EUR: "€",
    MXN: "$",
    COP: "$",
    CLP: "$",
    ARS: "$",
    BRL: "R$"
}

export function requireEmail(value, fieldName = "email") {
    const parsed = requireText(value, fieldName).toLowerCase()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed)) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requirePhone(value, fieldName = "phone") {
    const parsed = requireText(value, fieldName).replace(/[\s()-]/g, "")
    const phone = parsed.startsWith("+") ? parsed : `+51${parsed}`

    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
        throw badRequest(`${fieldName} invalid`)
    }

    return phone
}

export function parseOptionalPhone(value, fieldName = "phone") {
    if (value === undefined || value === null || value === "") {
        return null
    }

    return requirePhone(value, fieldName)
}

export function requireCurrencyCode(value, fieldName = "currency_code") {
    const parsed = requireText(value, fieldName).toUpperCase()

    if (!CURRENCY_SYMBOLS[parsed]) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function getCurrencySymbol(currencyCode = "PEN") {
    return CURRENCY_SYMBOLS[currencyCode] || CURRENCY_SYMBOLS.PEN
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

export function requireLoginPassword(value, fieldName = "password") {
    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    if (!value.trim()) {
        throw badRequest(`${fieldName} invalid`)
    }

    if (Buffer.byteLength(value, "utf8") > 72) {
        throw badRequest(`${fieldName} invalid`)
    }

    return value
}

export function requirePassword(value, fieldName = "password") {
    const parsed = requireLoginPassword(value, fieldName)

    if (parsed.length < 8) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requireVerificationCode(value, fieldName = "code") {
    const parsed = requireText(value, fieldName)

    if (!/^\d{6}$/.test(parsed)) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requirePasswordMatch(password, repeatPassword, fieldName = "password") {
    if (password !== repeatPassword) {
        throw badRequest(`${fieldName} invalid`)
    }
}
