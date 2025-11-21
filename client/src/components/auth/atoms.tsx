export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center max-w-md w-full">
        {children}
      </div>
    </div>
  );
};
