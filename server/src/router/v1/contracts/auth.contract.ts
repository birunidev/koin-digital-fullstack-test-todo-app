import { initContract } from "@ts-rest/core";
import z from "zod";
import { successResponseSchema } from "../../../shared/schemas/common";

const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

const userDataSchema = z.object({
  id: z.number(),
  email: z.string().email(),
});

const authResponseSchema = successResponseSchema(
  z.object({
    token: z.string(),
    user: userDataSchema,
  })
);

const c = initContract();

export const authContract = c.router({
  register: {
    method: "POST",
    path: "/auth/register",
    body: registerBodySchema,
    responses: {
      201: authResponseSchema,
    },
    summary: "Register a new user",
    metadata: {
      tags: ["Auth"],
    },
  },
  login: {
    method: "POST",
    path: "/auth/login",
    body: loginBodySchema,
    responses: {
      200: authResponseSchema,
    },
    summary: "Login with username and password",
    metadata: {
      tags: ["Auth"],
    },
  },
  me: {
    method: "GET",
    path: "/auth/me",
    responses: {
      200: successResponseSchema(userDataSchema),
    },
    summary: "Get current authenticated user information",
    metadata: {
      tags: ["Auth"],
      jwtAuthRequired: true,
    },
  },
});
