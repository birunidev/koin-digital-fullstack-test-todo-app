import z from "zod";
import { contract } from "../router/v1/contracts";
import { prisma } from "../lib/prisma";
import { tsRestSuccessResponse } from "../shared/utils/ts-rest-helpers";
import { TsRestRequest } from "@ts-rest/express";
import { NotFoundException } from "../shared/exceptions";

interface ReqUserId {
  userId: number;
}

export class TodoHandler {
  static async create(
    body: z.infer<typeof contract.todo.create.body>,
    { userId }: ReqUserId
  ) {
    const todo = await prisma.todo.create({
      data: {
        ...body,
        userId,
      },
    });

    return tsRestSuccessResponse(
      todo,
      201 as const,
      "Todo created successfully"
    );
  }

  static async getAll(userId: number) {
    const todos = await prisma.todo.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        userId,
      },
    });

    return tsRestSuccessResponse(
      todos,
      200 as const,
      "Todos retrieved successfully"
    );
  }

  static async getById(id: number) {
    const todo = await this.getTodoById(id);

    return tsRestSuccessResponse(
      todo,
      200 as const,
      "Todo retrieved successfully"
    );
  }

  private static async getTodoById(id: number) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException("Todo not found");
    }
    return todo;
  }

  static async update(
    id: number,
    body: z.infer<typeof contract.todo.update.body>
  ) {
    const todo = await this.getTodoById(id);
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title: body.title ? body.title : todo.title,
        description: body.description ? body.description : todo.description,
        isDone: body.isDone !== undefined ? body.isDone : todo.isDone,
      },
    });

    return tsRestSuccessResponse(
      updatedTodo,
      200 as const,
      "Todo updated successfully"
    );
  }

  static async delete(id: number) {
    const todo = await this.getTodoById(id);
    await prisma.todo.delete({ where: { id: todo.id } });

    return tsRestSuccessResponse(
      todo,
      200 as const,
      "Todo deleted successfully"
    );
  }
}
