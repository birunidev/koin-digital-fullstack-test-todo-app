import { TodosIndexPage } from "@/pages/todos/todos-index-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__with-protected-layout/todos")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TodosIndexPage />;
}
