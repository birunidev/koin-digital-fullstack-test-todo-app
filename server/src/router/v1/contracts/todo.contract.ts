import { initContract } from "@ts-rest/core";
import z from "zod";
import { successResponseSchema } from "../../../shared/schemas/common";

const todoBaseSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  isDone: z.boolean(),
});

const createTodoSchema = todoBaseSchema;

const getTodoSchema = todoBaseSchema.extend({
  id: z.number(),
});

const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isDone: z.boolean().optional().default(false),
});

const c = initContract();

export const todoContract = c.router({
  create: {
    method: "POST",
    path: "/todos",
    body: createTodoSchema,
    responses: {
      201: successResponseSchema(getTodoSchema),
    },
    summary: "Create a new todo",
    metadata: {
      tags: ["Todo"],
      jwtAuthRequired: true,
    },
  },
  getAll: {
    method: "GET",
    path: "/todos",
    responses: {
      200: successResponseSchema(z.array(getTodoSchema)),
    },
    summary: "Get all todos",
    metadata: {
      tags: ["Todo"],
      jwtAuthRequired: true,
    },
  },
  getById: {
    method: "GET",
    path: "/todos/{id}",
    responses: {
      200: successResponseSchema(getTodoSchema),
    },
    summary: "Get a todo by id",
    metadata: {
      tags: ["Todo"],
      jwtAuthRequired: true,
    },
  },
  update: {
    method: "PUT",
    path: "/todos/{id}",
    body: updateTodoSchema,
    responses: {
      200: successResponseSchema(getTodoSchema),
    },
    summary: "Update a todo by id",
    metadata: {
      tags: ["Todo"],
      jwtAuthRequired: true,
    },
  },
  delete: {
    method: "DELETE",
    path: "/todos/{id}",
    responses: {
      200: successResponseSchema(getTodoSchema),
    },
    summary: "Delete a todo by id",
    metadata: {
      tags: ["Todo"],
      jwtAuthRequired: true,
    },
  },
});
