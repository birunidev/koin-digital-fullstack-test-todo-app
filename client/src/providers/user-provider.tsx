import React, { useEffect } from "react";
import { useAuthStore } from "../stores/auth.store";
import { useGetAuthMe } from "../api/todo-api/api";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setIsUserReady, setIsLoadingUser } = useAuthStore();
  const { data } = useGetAuthMe({
    query: {
      enabled: localStorage.getItem("token") !== null,
    },
  });

  useEffect(() => {
    if (data?.data) {
      setUser({
        id: data.data.id,
        email: data.data.email,
      });
      setIsUserReady(true);
      setIsLoadingUser(false);
    } else {
      setIsLoadingUser(false);
    }
  }, [data, setUser, setIsUserReady, setIsLoadingUser]);

  return <>{children}</>;
};
