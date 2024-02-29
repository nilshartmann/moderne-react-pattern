# Recipify Backend

The backend fulfills multiple purposes:

- it serves an API for the JS clients
- it provides the HTMX client

# Running the backend

- The easiest is to launch the class `TestBackendApplication` from `src/test`. Thanks to Spring Boot's TestContainers support, it will launch the required Postgres database using TestContainers.
- You can also start the database yourself using the `docker-compose.yaml` file in this project's root folder.
- When Postgres is running, run `BackendApplication` from `src/main`

## Using the htmx frontend

If you want to try the htmx frontend, go to `backend` and run:

```bash

pnpm install
pnpm watch

```

Note that building the htmx frontend is not part of the gradle build process. So if you build the backend jar, the (tailwind) css files might be missing.

# Running the SPA frontend

Go to `frontend` and run:

```bash
pnpm install
pnpm dev
```

## Typesafe routes in the frontend

When starting the backend a file with an OpenAPI description for the http endpoints is generated.

Running `pnpm openapi:generate` (or `pnpm openapi:watch`) will take this file and generate a zod/typescript description for all endpoints, so you can access the endpoints in a "end-to-end" typesafe manner.
(See `use-queries.ts`) as an example.
