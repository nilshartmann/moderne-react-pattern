import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_static")({
  component: () => (
    <div className={"container mx-auto flex-grow"}>
      <Outlet />
    </div>
  ),
});
