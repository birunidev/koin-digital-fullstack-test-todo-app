import { initContract } from "@ts-rest/core";
import { authContract } from "./auth.contract";
import {
  errorResponseSchema,
  validationErrorResponseSchema,
} from "../../../shared/schemas/common";
import { apiConfig } from "../../../config/api";
import { todoContract } from "./todo.contract";

const c = initContract();

export const contract = c.router(
  {
    auth: authContract,
    todo: todoContract,
  },
  {
    commonResponses: {
      400: validationErrorResponseSchema,
      401: errorResponseSchema,
      403: errorResponseSchema,
      404: errorResponseSchema,
      409: errorResponseSchema,
      500: errorResponseSchema,
    },
    pathPrefix: apiConfig.basePath,
  }
);
