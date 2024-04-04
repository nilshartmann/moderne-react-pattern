import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { H1 } from "../components/Heading.tsx";
import { Suspense } from "react";
import { GlobalLoadingIndicator } from "../components/GlobalLoadingIndicator.tsx";
import { Timer } from "../components/Timer.tsx";
import z from "zod";
import { NewsletterRegistration } from "../components/NewsletterRegistration.tsx";

const RoutePageParams = z.object({
  feedback_page: z.number().optional().default(0),
  search: z.string().optional(),
});

export const Route = createRootRoute({
  component: GlobalPageLayout,
  validateSearch: (s) => RoutePageParams.parse(s),
});

export default function GlobalPageLayout() {
  return (
    <div className="flex min-h-screen flex-col ">
      <div className={"container mx-auto h-16"}>
        <div className={"flex h-full items-center justify-end"}>
          <NewsletterRegistration />
        </div>
      </div>

      <header
        className={"flex h-24 items-center bg-cover bg-center"}
        style={{
          backgroundImage: "url('/images/landing-page.png')",
        }}
      >
        <div className={"container mx-auto"}>
          <div className={"flex h-full items-center justify-between"}>
            <div className={"flex items-center font-space font-bold text-red "}>
              <H1 className={"inline-block bg-white p-2 pb-3 text-4xl"}>
                <Link to={"/"} search={(s) => s} className={"hover:underline"}>
                  Recipify
                </Link>
              </H1>
              <div className={"ms-2 shrink-0 bg-white p-1 text-xl"}>
                <span className="text-green">SPA</span> Edition
              </div>
            </div>
            {/*<GlobalServingsWidget />*/}
            <Timer />
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
