import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useLocalStorage } from "react-use";

export const Route = createFileRoute("/__with-protected-layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [, setToken] = useLocalStorage("token");
  const { isUserReady, isLoadingUser } = useAuthStore();

  const handleLogout = () => {
    setToken(null);
    window.location.href = "/auth/login";
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (!isUserReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Oops! Kamu Belum Login</h1>
          <p>Silahkan login untuk melanjutkan</p>
          <Link to="/auth/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <div className="fixed bottom-4 right-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
}
