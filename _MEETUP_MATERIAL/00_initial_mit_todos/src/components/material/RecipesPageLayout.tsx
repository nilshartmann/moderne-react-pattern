import { ReactNode, Suspense } from "react";
import RecipesHeader from "../layout/RecipesHeader.tsx";
import { Timer } from "../Timer.tsx";
import { GlobalLoadingIndicator } from "./GlobalLoadingIndicator.tsx";

type RecipesPageLayoutProps = {
  children: ReactNode;
};

export function RecipesPageLayout({ children }: RecipesPageLayoutProps) {
  return (
    <>
      <RecipesHeader>
        <Timer />
      </RecipesHeader>
      <main className={"flex-grow "}>
        <Suspense fallback={<GlobalLoadingIndicator />}>{children}</Suspense>
      </main>
    </>
  );
}
