import type { GetTodos200DataItem } from "@/api/todo-api/models";
import { TodoListItem } from "./todo-list-item";

export const TodoList = ({ todos }: { todos: GetTodos200DataItem[] }) => {
  return (
    <div className="py-12 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">My Todo List</h1>
      <div className="flex flex-col gap-2">
        {todos.length === 0 ? (
          <div className="flex flex-col gap-2 border border-border rounded-lg p-4">
            <p className="text-gray-500 text-center">Belum ada todo ...</p>
          </div>
        ) : (
          todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};
