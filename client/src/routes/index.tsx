import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isUserReady, user } = useAuthStore();

  return (
    <div>
      {isUserReady ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <h1 className="text-2xl font-bold">Hello {user?.email}</h1>
          <p className="text-sm text-gray-500">
            Selamat datang di aplikasi kelola todo
          </p>
          <Link to="/todos">
            <Button className="w-full">Kelola Todos</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <h1 className="text-2xl font-bold">Hello</h1>
          <p className="text-sm text-gray-500">
            Silahkan login untuk melanjutkan
          </p>
          <Link to="/auth/login">
            <Button className="w-full">Login untuk kelola todo</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
