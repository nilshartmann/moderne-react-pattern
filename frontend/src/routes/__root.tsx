import { createRootRoute, Outlet } from "@tanstack/react-router";
import { DefaultLayout } from "../components/layout/DefaultLayout.tsx";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootRoute,
});

export default function RootRoute() {
  return (
    <DefaultLayout>
      <Outlet />
      <TanStackRouterDevtools position={"bottom-right"} />
    </DefaultLayout>
  );
}
