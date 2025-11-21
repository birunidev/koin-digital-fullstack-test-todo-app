import { AuthHandler } from "../../handlers/auth.handler";
import { contract } from "./contracts";
import { initServer } from "@ts-rest/express";

const s = initServer();

export const authRouter = s.router(contract.auth, {
  register: ({ body }) => AuthHandler.register(body),
  login: ({ body }) => AuthHandler.login(body),
  me: ({ req }) => AuthHandler.me(req),
});
