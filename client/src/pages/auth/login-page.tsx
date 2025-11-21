import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGetAuthMeQueryKey, usePostAuthLogin } from "@/api/todo-api/api";
import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { AuthPage } from "@/components/auth/atoms";
import { Loader2 } from "lucide-react";
import type { AxiosError } from "axios";
import type { PostAuthLogin400 } from "@/api/todo-api/models";
import { useLocalStorage } from "react-use";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email tidak valid"),
  password: z
    .string()
    .min(1, "Password tidak boleh kosong")
    .min(8, "Password minimal 8 karakter"),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage<string>("token");
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = usePostAuthLogin({
    mutation: {
      onSuccess: async (data) => {
        toast.success("Login berhasil");
        setToken(data.data.token);
        await queryClient.invalidateQueries({
          queryKey: getGetAuthMeQueryKey(),
        });
        navigate({ to: "/" });
      },
      onError: (error) => {
        const axiosError = error as unknown as AxiosError<PostAuthLogin400>;
        toast.error(axiosError.response?.data.message ?? "Login gagal");
      },
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login({ data: values });
  };

  return (
    <AuthPage>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Silahkan login untuk melanjutkan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
              <Link to="/auth/register">
                <Button variant="link" className="w-full">
                  Belum punya akun? Register
                </Button>
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthPage>
  );
};
