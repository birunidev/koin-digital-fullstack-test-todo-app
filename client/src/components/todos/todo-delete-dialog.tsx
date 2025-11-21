import { getGetTodosQueryKey, useDeleteTodosId } from "@/api/todo-api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const TodoDeleteDialog = ({
  trigger,
  todoId,
}: {
  trigger: React.ReactNode;
  todoId: number;
}) => {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useDeleteTodosId({
    mutation: {
      onSuccess: () => {
        toast.success("Todo berhasil dihapus");
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
      },
      onError: () => {
        toast.error("Todo gagal dihapus");
      },
    },
  });

  const onDelete = () => {
    deleteTodoMutation.mutate({
      id: todoId.toString(),
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Todo</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus todo ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
