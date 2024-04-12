import { createRootRoute, Outlet } from "@tanstack/react-router";
import { GlobalPageLayout } from "../components/layout/GlobalPageLayout.tsx";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: RootRoute,
});

export default function RootRoute() {
  return (
    <GlobalPageLayout>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
      {/*<TanStackRouterDevtools position={"bottom-right"} />*/}
    </GlobalPageLayout>
  );
}
