import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "../api-schema/openapi.yaml",
      parserOptions: {
        externalRefs: {
          allow: ["*"],
        }
      },
    },
    output: {
      target: "./src/generated-api-client/generated.ts",
      client: "fetch",
    },
  },
});

