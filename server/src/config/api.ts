export const apiConfig = {
  prefix: process.env.API_PREFIX || "api",
  version: process.env.API_VERSION || "v1",
  basePath: `/${process.env.API_PREFIX || "api"}/${
    process.env.API_VERSION || "v1"
  }`,
};
