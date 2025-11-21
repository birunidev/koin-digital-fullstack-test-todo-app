export const TodoPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center max-w-md w-full py-12">
        <div className="w-full flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};

export const TodoHeader = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">My Todo</h1>
      <p className="text-sm text-gray-500">
        Silahkan tambahkan todo baru untuk membantu Anda dalam mengerjakan
        tugas.
      </p>
    </>
  );
};
