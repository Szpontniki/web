import { defineConfig } from "orval";

export default defineConfig({
  auxiliary: {
    input: {
      target: "./api-schema/auxiliary/openapi.yaml",
      parserOptions: {
        externalRefs: {
          allow: ["*"],
        }
      },
    },
    output: {
      target: "./src/api/auxiliary/generated.ts",
      client: "react-query",
      baseUrl: "/"
    },
  },
  

  firmare: {
    input: {
      target: "./api-schema/firmware/openapi.yaml",
      parserOptions: {
        externalRefs: {
          allow: ["*"],
        }
      },
    },
    output: {
      target: "./src/api/firmware/generated.ts",
      client: "react-query",
      baseUrl: "/"
    },
  },
});

