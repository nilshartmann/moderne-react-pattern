import { createRootRoute, Outlet } from "@tanstack/react-router";
import { GlobalPageLayout } from "../components/layout/GlobalPageLayout.tsx";

export const Route = createRootRoute({
  component: RootRoute,
});

export default function RootRoute() {
  return (
    <GlobalPageLayout>
      <Outlet />
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      {/*<TanStackRouterDevtools position={"bottom-right"} />*/}
    </GlobalPageLayout>
  );
}
