import { useGetTodos } from "@/api/todo-api/api";
import { AddTodoForm } from "@/components/todos/add-todo-form";
import { TodoHeader, TodoPage } from "@/components/todos/atoms";
import { TodoList } from "@/components/todos/todo-list";

export const TodosIndexPage = () => {
  const { data: todos } = useGetTodos();

  const todosData = todos?.data ?? [];

  return (
    <TodoPage>
      <TodoHeader />
      <AddTodoForm />
      <TodoList todos={todosData} />
    </TodoPage>
  );
};
