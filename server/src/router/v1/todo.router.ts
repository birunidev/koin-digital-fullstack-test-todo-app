import { initServer } from "@ts-rest/express";
import { contract } from "./contracts";
import { TodoHandler } from "../../handlers/todo.handler";

const s = initServer();

export const todoRouter = s.router(contract.todo, {
  create: ({ body, req }) => {
    return TodoHandler.create(body, { userId: req.user?.sub! });
  },
  getAll: ({ req }) => TodoHandler.getAll(req.user?.sub!),
  getById: ({ req }) => {
    return TodoHandler.getById(parseInt(req.params.id, 10));
  },
  update: ({ body, req }) => {
    return TodoHandler.update(parseInt(req.params.id, 10), body);
  },
  delete: ({ req }) => {
    return TodoHandler.delete(parseInt(req.params.id, 10));
  },
});
