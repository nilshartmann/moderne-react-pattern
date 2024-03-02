import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { H1 } from "../components/Heading.tsx";
import { Suspense } from "react";
import { GlobalLoadingIndicator } from "../components/material/GlobalLoadingIndicator.tsx";

export const Route = createRootRoute({
  component: GlobalPageLayout,
});

export default function GlobalPageLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={"flex h-24 items-center bg-cover bg-center"}
        style={{
          backgroundImage: "url('/images/landing-page.png')",
        }}
      >
        <div className={"container mx-auto"}>
          <div className={"flex h-full items-center justify-between"}>
            <H1
              className={
                "inline-block bg-white p-2 pb-3 font-space text-4xl font-bold text-red"
              }
            >
              <Link to={"/"} className={"hover:underline"}>
                Recipify
              </Link>
            </H1>
          </div>
        </div>
      </header>
      <div className="flex-grow">
        <Suspense fallback={<GlobalLoadingIndicator />}>
          <Outlet />
        </Suspense>
      </div>
      <footer className="h-16 bg-gray-800 font-inter text-sm text-gray-200">
        <div className="container mx-auto flex h-full items-center justify-between">
          <p>Dummy content only. Do not cook 👮‍.</p>
          <p>https://nilshartmann.net</p>
        </div>
      </footer>
    </div>
  );
}
