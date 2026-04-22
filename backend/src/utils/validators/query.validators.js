import { badRequest } from "../../errors/http-errors.js"
import { requireAllowedValue, requirePositiveInteger } from "./base.validators.js"

export function requirePage(value, fieldName = "page") {
    const parsed = Number(value)

    if (!Number.isInteger(parsed) || parsed <= 0) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function requireHistorySort(value, fieldName = "sort") {
    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    const parsed = value.trim()

    return requireAllowedValue(parsed, ["recent", "oldest"], fieldName)
}

export function requireSortDirection(value, fieldName = "sort") {
    if (typeof value !== "string") {
        throw badRequest(`${fieldName} invalid`)
    }

    const parsed = value.trim()

    return requireAllowedValue(parsed, ["ASC", "DESC"], fieldName)
}

export function requireNonNegativeOffset(value, fieldName = "offset") {
    const parsed = Number(value)

    if (!Number.isInteger(parsed) || parsed < 0) {
        throw badRequest(`${fieldName} invalid`)
    }

    return parsed
}

export function parsePageSortQuery({ page = 1, sort = "recent", limit = 20 } = {}) {
    const currentPage = requirePage(page, "page")
    const parsedSort = requireHistorySort(sort, "sort")
    const parsedLimit = requirePositiveInteger(limit, "limit")
    const offset = (currentPage - 1) * parsedLimit
    const orderDirection = parsedSort === "oldest" ? "ASC" : "DESC"

    return {
        page: currentPage,
        sort: parsedSort,
        limit: parsedLimit,
        offset,
        orderDirection
    }
}