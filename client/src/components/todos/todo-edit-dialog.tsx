import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoForm } from "./todo-form";
import {
  getGetTodosQueryKey,
  useGetTodosId,
  usePutTodosId,
} from "@/api/todo-api/api";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@/hooks/use-disclosure";

const editTodoFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const TodoEditDialog = ({
  trigger,
  todoId,
}: {
  trigger: React.ReactNode;
  todoId: number;
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { data: todo } = useGetTodosId(todoId.toString(), {
    query: {
      enabled: !!todoId && isOpen,
    },
  });

  const updateTodoMutation = usePutTodosId({
    mutation: {
      onSuccess: () => {
        toast.success("Todo berhasil diubah");
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
        onClose();
      },
    },
  });
  const form = useForm<z.infer<typeof editTodoFormSchema>>({
    resolver: zodResolver(editTodoFormSchema),
    defaultValues: {
      title: todo?.data.title ?? "",
      description: todo?.data.description ?? "",
    },
  });

  useEffect(() => {
    if (todo) {
      form.reset({
        title: todo.data.title,
        description: todo.data.description ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  const onSubmit = (values: z.infer<typeof editTodoFormSchema>) => {
    updateTodoMutation.mutate({
      id: todoId.toString(),
      data: {
        title: values.title,
        description: values.description ?? undefined,
        isDone: todo?.data.isDone ?? undefined,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Todo</DialogTitle>
          <DialogDescription>
            Ubah todo untuk mengupdate detail.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <TodoForm />
            <Button type="submit" className="w-full">
              <Save /> Ubah
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
