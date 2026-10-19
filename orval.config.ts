import { defineConfig } from "orval";

const baseAPIURLs = {
  auxiliary: process.env.AUXILIARY_API_URL ?? "http://localhost:3001/",
  firmware: process.env.FIRMWARE_URL ?? "http://localhost:3000/",
};

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
      baseUrl: baseAPIURLs.auxiliary,
    },
  },
  

  firmware: {
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
      baseUrl: baseAPIURLs.firmware,
    },
  },
});

