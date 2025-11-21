import { initServer } from "@ts-rest/express";
import { contract } from "./contracts";
import { authRouter } from "./auth.router";
import { todoRouter } from "./todo.router";

const s = initServer();

export const tsRestRouter = s.router(contract, {
  auth: authRouter,
  todo: todoRouter,
});
