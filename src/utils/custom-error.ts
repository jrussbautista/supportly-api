type ErrorData = { [key: string]: any };

export class CustomError extends Error {
  public __proto__: Error;

  constructor(
    public message: string,
    public code: string | number = 'INTERNAL_ERROR',
    public status: number = 500,
    public data: ErrorData = {}
  ) {
    super();
    const trueProto = new.target.prototype;
    this.__proto__ = trueProto;
  }
}

export class DuplicateFieldError extends CustomError {
  constructor(message: string) {
    super(message, 'DUPLICATE_FIELD', 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originalUrl: string) {
    super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entityName: string) {
    super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', 404);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = 'Authentication token is invalid.') {
    super(message, 'INVALID_TOKEN', 401);
  }
}
