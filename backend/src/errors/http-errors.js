import { AppError } from "./app-error.js";

export function badRequest(message = "Invalid Data") {
    return new AppError(message, 400, "BAD_REQUEST")
}

export function unauthorized(message = "Unauthorized") {
    return new AppError(message, 401, "UNAUTHORIZED")
}

export function forbidden(message = "Forbidden") {
    return new AppError(message, 403, "FORBIDDEN")
}

export function notFound(message = "Not Found") {
    return new AppError(message, 404, "NOT_FOUND")
}

export function conflict(message = "Conflict") {
    return new AppError(message, 409, "CONFLICT")
}