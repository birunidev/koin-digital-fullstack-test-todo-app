import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./user-provider";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
};
