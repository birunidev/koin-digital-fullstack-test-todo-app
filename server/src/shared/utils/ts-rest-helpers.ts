export const formatSuccessResponse = <T>(
  data: T,
  message = "OK",
  statusCode = 200
) => ({
  success: true as const,
  message,
  data,
  statusCode,
});

export const tsRestSuccessResponse = <T, const S extends number>(
  data: T,
  status: S,
  message = "OK"
) =>
  ({
    status,
    body: formatSuccessResponse(data, message, status),
  } as { status: S; body: ReturnType<typeof formatSuccessResponse<T>> });
