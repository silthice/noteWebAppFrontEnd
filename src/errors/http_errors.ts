class HttpError extends Error {
    constructor(message?: string) {
        super(message)
        this.name = this.constructor.name
    }
}

/**
 * Status code 401 errror
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code 409 errror
 */
 export class ConflictError extends HttpError {}