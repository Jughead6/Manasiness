import { badRequest } from "../../errors/http-errors.js"
import { requireAllowedValue, requireText } from "./base.validators.js"

export function requireISODate(value, fieldName = "date") {
    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    const parsed = value.trim()

    if (!/^\d{4}-\d{2}-\d{2}$/.test(parsed)) {
        throw badRequest(`${fieldName} invalid`)
    }

    const [yearString, monthString, dayString] = parsed.split("-")
    const year = Number(yearString)
    const month = Number(monthString)
    const day = Number(dayString)

    const date = new Date(Date.UTC(year, month - 1, day))

    if (
        Number.isNaN(date.getTime()) ||
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() + 1 !== month ||
        date.getUTCDate() !== day
    ) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requirePeriodFilter(value, fieldName = "period") {
    const parsed = requireText(value, fieldName)

    return requireAllowedValue(parsed, ["week", "month"], fieldName)
}

export function requireCatalogOption(value, fieldName = "catalogOption") {
    const parsed = requireText(value, fieldName)

    return requireAllowedValue(parsed, ["topSold", "leastSold"], fieldName)
}

export function parseOptionalSearch(value, fieldName = "search") {
    if (value === undefined || value === null || value === "") {
        return ""
    }

    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    return value.trim()
}