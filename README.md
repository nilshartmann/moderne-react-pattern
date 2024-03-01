# Recipify: Frontend Demo

This is a sample application for various frontend technologies.

![Screenshot of example application](screenshot.png)

### Techstack

**Backend:**

- Java (JDK21), Spring Boot 3.2
- Postgres 16

**Frontend 1 (Single-Page-App)**

- React 18
- TypeScript
- Vite
- TanStack Router and TanStack Query
- TypeScript and zod-Code for typesafe API access is automatically generated from OpenAPI definitions.
  - You can find [more on that here](https://github.com/nilshartmann/end-to-end-typesafety-spring-boot-typescript).

I recorded a **video on TanStack Router**, that uses this demo example. You can find the [video on YouTube](https://youtu.be/KkrS_wfFq2I).

**Frontend 2 (HTMX)**

- HTMX
- Alpine.js
- Thymeleaf

## Running the backend

The backend that provides the API for the JS frontends and the HTMX endpoints is implemented with Spring Boot and Java.

In order to run it, you either have to use Java or use the prebuild Docker Image.

The easiest is to use the `docker-compose-backend.yaml` file in the root of this project, that also starts the required Postgres database:

```
docker-compose -f docker-compose-backend.yaml up -d
```

If you're a Java ("fullstack") developer, you can launch the backend from your IDE by running the Spring Boot class `nh.recipify.TestBackendApplication`. This also automatically starts the postgres database using Testcontainers. (Note that you need JDK21 installed)

In either way, the backend runs on http://localhost:8080.

## Running the SPA frontend

The frontend is a Single-Page-Application built with Vite and uses [pnpm](https://pnpm.io/) as package manager.

If you have not installed pnpm already, you can enable it with [Node.js corepacks](https://nodejs.org/docs/latest-v20.x/api/corepack.html) by running on your terminal:

```
corepacks enable
```

(Probably installing the packages with npm or yarn would work too, but I have not tested it.)

Then install and start the Vite devserver for the frontend:

```
cd frontend
pnpm install
pnpm dev
```

The frontend runs on http://localhost:8090

## Running the HTMX frontend

The HTMX "frontend" is included in the backend. Please see README in `backend` folder for more information.

## A note on the content

The content is almost entirely generated with JetBrains AI, ChatGPT and DALL-E. You should not treat the recipes for real (unless you blindly trust AI) :-)

## Questions, comments, feedback

If you have questions or commments, please feel free to open an issue here in this directory.

You can also reach and follow me on [several platforms](https://nilshartmann.net/follow-me).
