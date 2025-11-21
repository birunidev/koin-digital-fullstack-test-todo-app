import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/http.exception";
import { ZodError } from "zod";

export function errorHandlerMiddleware(
  error: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof HttpException) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    });
    return;
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      statusCode: 400,
      errors: error.issues.map((issue) => ({
        path: issue.path.join("."),
        errors: [issue.message],
      })),
    });
    return;
  }

  // Handle errors with name "ZodError" (sometimes ZodError is not instanceof)
  if (error.name === "ZodError" && "issues" in error) {
    const zodError = error as unknown as ZodError;
    res.status(400).json({
      success: false,
      message: "Validation error",
      statusCode: 400,
      errors: zodError.issues.map((issue) => ({
        path: issue.path.join("."),
        errors: [issue.message],
      })),
    });
    return;
  }

  console.error("Unexpected error:", error);

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message,
    statusCode: 500,
  });
}
