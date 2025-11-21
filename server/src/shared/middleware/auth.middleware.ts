import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new UnauthorizedException("Token not provided");
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const payload = decoded as JwtPayload;

    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException("Invalid token payload");
    }

    req.user = {
      sub: Number(payload.sub),
      email: payload.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedException("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedException("Invalid token");
    } else {
      throw new UnauthorizedException("Authentication failed");
    }
  }
};
