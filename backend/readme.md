# Recipify Backend

The backend fulfills multiple purposes:

- it serves an API for the JS clients
- it provides the HTMX client

# Running the backend

- The easiest is to launch the class `TestBackendApplication` from `src/test`. Thanks to Spring Boot's TestContainers support, it will launch the required Postgres database using TestContainers. It also automatically sets the `dev` profile.
- You can also start the database yourself using the `docker-compose.yaml` file in this project's root folder.
- When Postgres is running, run `BackendApplication` from `src/main`.

## Using the htmx frontend

> When starting the backend, you should make sure to set the `dev` profile. Setting the `dev` profile disabled Thymeleaf Template cache. When using the `TestBackendApplication`, the profile is automatically set.

If you want to use the htmx frontend, **start the backend first**, as described above.

When the backend runs, you need to build the (tailwind) CSS files. You can do so by running the following commands in the `backend` folder:

```bash

pnpm install
pnpm watch
```

The `watch` script listens for changes in your templates and copies the changed files to the output directory. It also re-generated the tailwind `main.css` file, when CSS classes are changed.
So, while the `watch` script is running, any changes you make to on of the template files, will be picked up automatically, and you should see your changes in your browser after page reload.

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
