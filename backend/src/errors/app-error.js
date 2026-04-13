export class AppError extends Error {
    constructor(message = "Request failled", status = 500, code = "APP_URL") {
        super(message)
        this.status = status
        this.code = code
    }
}