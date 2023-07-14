class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** Status code: 401, user not authorized */
export class UnauthorizedError extends HttpError {}

/** Status code: 409, conflict error */
export class ConflictError extends HttpError {}
