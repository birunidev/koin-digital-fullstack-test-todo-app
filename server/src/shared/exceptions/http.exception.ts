/**
 * Base HTTP Exception class
 * Similar to NestJS HttpException
 */
export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

/**
 * BadRequestException - 400
 */
export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}

/**
 * UnauthorizedException - 401
 */
export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

/**
 * ForbiddenException - 403
 */
export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

/**
 * NotFoundException - 404
 */
export class NotFoundException extends HttpException {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

/**
 * ConflictException - 409
 */
export class ConflictException extends HttpException {
  constructor(message: string = "Conflict") {
    super(message, 409);
  }
}

/**
 * InternalServerErrorException - 500
 */
export class InternalServerErrorException extends HttpException {
  constructor(message: string = "Internal Server Error") {
    super(message, 500);
  }
}
