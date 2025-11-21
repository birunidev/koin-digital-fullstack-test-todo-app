import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { TodoEditDialog } from "./todo-edit-dialog";
import { TodoDeleteDialog } from "./todo-delete-dialog";
import type { GetTodos200DataItem } from "@/api/todo-api/models";
import { toast } from "sonner";
import { getGetTodosQueryKey, usePutTodosId } from "@/api/todo-api/api";
import { useQueryClient } from "@tanstack/react-query";

export const TodoListItem = ({ todo }: { todo: GetTodos200DataItem }) => {
  const queryClient = useQueryClient();
  const updateTodoMutation = usePutTodosId({
    mutation: {
      onSuccess: () => {
        toast.success("Todo berhasil diubah");
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
      },
    },
  });

  const toggleTodo = (checked: boolean) => {
    updateTodoMutation.mutate({
      id: todo.id.toString(),
      data: {
        isDone: checked ? true : false,
      },
    });
  };

  return (
    <div className="border border-border p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox checked={todo.isDone} onCheckedChange={toggleTodo} />
          <div>
            <p
              className={cn("font-medium", {
                "line-through text-gray-400": todo.isDone,
                "text-gray-700": !todo.isDone,
              })}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p
                className={cn("text-sm text-gray-700", {
                  "line-through text-gray-400": todo.isDone,
                })}
              >
                {todo.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TodoEditDialog
            todoId={todo.id}
            trigger={
              <Button variant="ghost">
                <Edit className="w-4 h-4" />
              </Button>
            }
          />
          <TodoDeleteDialog
            trigger={
              <Button variant="ghost">
                <Trash className="w-4 h-4" />
              </Button>
            }
            todoId={todo.id}
          />
        </div>
      </div>
    </div>
  );
};
