import { defineConfig } from "orval";

// TODO: this should probably be definable via an environment variable?
const baseAPIURLs = {
  auxiliary: "http://localhost:3001/",
  firmware: "http://localhost:3000/",
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
      baseUrl: baseAPIURLs.firmware,
    },
  },
});

