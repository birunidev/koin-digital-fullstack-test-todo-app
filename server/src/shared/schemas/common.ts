import z from "zod";

export const successResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
    statusCode: z.number(),
  });

export const validationErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  statusCode: z.number(),
  errors: z
    .array(
      z.object({
        path: z.string(),
        errors: z.array(z.string()),
      })
    )
    .optional(),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  statusCode: z.number(),
});
