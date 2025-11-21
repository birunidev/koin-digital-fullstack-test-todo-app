import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { TodoForm } from "./todo-form";
import { getGetTodosQueryKey, usePostTodos } from "@/api/todo-api/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const AddTodoForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createTodoMutation = usePostTodos({
    mutation: {
      onSuccess: () => {
        toast.success("Todo berhasil dibuat");
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
        form.reset();
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createTodoMutation.mutate({
      data: {
        title: values.title,
        description: values.description ? values.description : null,
        isDone: false,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <TodoForm />
        <Button type="submit" className="w-full">
          <Plus /> Tambah
        </Button>
      </form>
    </Form>
  );
};
