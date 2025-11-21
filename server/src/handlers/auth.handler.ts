import z from "zod";
import { contract } from "../router/v1/contracts";
import { prisma } from "../lib/prisma";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../shared/exceptions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import { Request } from "express";
import { tsRestSuccessResponse } from "../shared/utils/ts-rest-helpers";

export class AuthHandler {
  static async register(body: z.infer<typeof contract.auth.register.body>) {
    const { email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    return tsRestSuccessResponse(
      {
        token,
        user,
      },
      201 as const,
      "User created successfully"
    );
  }

  static async login(body: z.infer<typeof contract.auth.login.body>) {
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    return tsRestSuccessResponse(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      200 as const,
      "Login successful"
    );
  }

  static async me(req: Request) {
    const userId = req.user?.sub;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return tsRestSuccessResponse(
      user,
      200 as const,
      "User information retrieved successfully"
    );
  }
}
