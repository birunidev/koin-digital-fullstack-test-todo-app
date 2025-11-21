import express, { Application } from "express";
import cors from "cors";
import { errorHandlerMiddleware } from "./shared/middleware";
import { createExpressEndpoints } from "@ts-rest/express";
import { contract } from "./router/v1/contracts";
import { tsRestRouter } from "./router/v1";
import { generateOpenAPIDocument } from "./config/openapi";
import swaggerUi from "swagger-ui-express";
import { authMiddleware } from "./shared/middleware/auth.middleware";
import { apiConfig } from "./config/api";

export const app: Application = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.use(`${apiConfig.basePath}/auth/me`, authMiddleware);
app.use(`${apiConfig.basePath}/todos`, authMiddleware);

createExpressEndpoints(contract, tsRestRouter, app);

const openApiDocument = generateOpenAPIDocument();

app.get("/docs-json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(openApiDocument);
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, {
    customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
      `,
    customSiteTitle: "Todo API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
      persistAuthorizationSupport: true,
    },
  })
);

app.use(errorHandlerMiddleware);
