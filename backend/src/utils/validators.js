import { badRequest } from "../errors/http-errors.js";

export function requirePositiveInteger(value, fieldName) {
    const parsed = Number(value)

    if(!Number.isInteger(parsed) || parsed <= 0) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requirePositiveNumber(value, fieldName) {
    const parsed = Number(value)

    if(!Number.isFinite(parsed) || parsed <= 0) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requireAllowedValue(value, allowedValues, fieldName) {

    if (!allowedValues.includes(value)) {
        throw badRequest(`${fieldName} invalid`)
    }

    return value
}

export function requireText(value, fieldName) {
    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    const parsed = value.trim()

    if (!parsed) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}